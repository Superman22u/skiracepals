import { useEffect, useState, type FormEvent } from "react";
import { api } from "../api";
import { useAuth } from "../auth";
import { useI18n } from "../i18n";
import { outlookMail } from "../mail";

type Member = { id: number; nickname: string; email: string };

type GroupView = {
  id: number;
  name: string;
  ownerId: number;
  ownerNickname: string;
  canManage: boolean;
  canEmail: boolean;
  members: Member[];
};

type GroupsResponse = {
  directory: { id: number; nickname: string }[];
  owned: GroupView[];
  joined: GroupView[];
  others: GroupView[];
};

export function GroupsPanel() {
  const { user } = useAuth();
  const { t } = useI18n();
  const [data, setData] = useState<GroupsResponse | null>(null);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    setData(await api<GroupsResponse>("/api/groups"));
  }

  useEffect(() => {
    load().catch((err: unknown) => setError(err instanceof Error ? err.message : "couldNotLoadGroups"));
  }, []);

  async function createGroup(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api("/api/groups", { method: "POST", body: JSON.stringify({ name }) });
      setName("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "couldNotCreateGroup");
    } finally {
      setBusy(false);
    }
  }

  if (error && !data) return <p className="alert">{t(error)}</p>;
  if (!data) return null;

  return (
    <section className="stack">
      <h2>{t("groups")}</h2>
      <p className="muted">{t("groupsHelp")}</p>
      <form className="card form" onSubmit={createGroup}>
        <label>
          {t("groupName")}
          <input value={name} onChange={(event) => setName(event.target.value)} maxLength={40} required />
        </label>
        {error ? <p className="alert">{t(error)}</p> : null}
        <button className="primary" type="submit" disabled={busy || name.trim().length === 0}>
          {t("createGroup")}
        </button>
      </form>
      <h2>{t("yourGroups")}</h2>
      {data.owned.length === 0 ? <p className="card empty">{t("noGroupsYet")}</p> : null}
      {data.owned.map((group) => (
        <GroupCard key={group.id} group={group} directory={data.directory} viewerId={user.id} onChange={load} />
      ))}
      {user.isAdmin ? null : (
        <>
          <h2>{t("groupsYouJoined")}</h2>
          {data.joined.length === 0 ? <p className="card empty">{t("noJoinedGroups")}</p> : null}
          {data.joined.map((group) => (
            <GroupCard key={group.id} group={group} directory={data.directory} viewerId={user.id} onChange={load} />
          ))}
        </>
      )}
      {user.isAdmin ? (
        <>
          <h2>{t("allGroups")}</h2>
          {data.others.length === 0 ? <p className="card empty">{t("noOtherGroups")}</p> : null}
          {data.others.map((group) => (
            <GroupCard key={group.id} group={group} directory={data.directory} viewerId={user.id} onChange={load} />
          ))}
        </>
      ) : null}
    </section>
  );
}

function GroupCard({
  group,
  directory,
  viewerId,
  onChange,
}: {
  group: GroupView;
  directory: { id: number; nickname: string }[];
  viewerId: number;
  onChange: () => Promise<void>;
}) {
  const { t } = useI18n();
  const { user } = useAuth();
  const [palId, setPalId] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [pendingId, setPendingId] = useState<number | null>(null);
  const [confirming, setConfirming] = useState(false);
  const taken = new Set(group.members.map((member) => member.id));
  const choices = directory.filter((person) => !taken.has(person.id));
  const emails = group.members.filter((member) => member.id !== viewerId).map((member) => member.email);
  const mailHref = outlookMail(emails, t("groupMailSubject", { name: group.name }), t("groupMailBody", { name: group.name }));

  async function addMember(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api(`/api/groups/${group.id}/members`, { method: "POST", body: JSON.stringify({ userId: Number(palId) }) });
      setPalId("");
      await onChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : "couldNotChangeGroup");
    } finally {
      setBusy(false);
    }
  }

  async function removeMember(memberId: number) {
    setBusy(true);
    setError("");
    try {
      await api(`/api/groups/${group.id}/members/${memberId}`, { method: "DELETE" });
      setPendingId(null);
      await onChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : "couldNotChangeGroup");
    } finally {
      setBusy(false);
    }
  }

  async function removeGroup() {
    setBusy(true);
    setError("");
    try {
      await api(`/api/groups/${group.id}`, { method: "DELETE" });
      await onChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : "couldNotChangeGroup");
      setBusy(false);
    }
  }

  return (
    <article className="card stack">
      <h3>{group.name}</h3>
      <p className="meta">{t("groupOwner", { name: group.ownerNickname })}</p>
      {group.canEmail ? <p className="muted">{t("groupMailHelp")}</p> : null}
      {group.canEmail && emails.some((email) => email.trim()) ? (
        <a className="primary" href={mailHref}>
          {t("groupMail")}
        </a>
      ) : null}
      {group.canEmail && !emails.some((email) => email.trim()) ? <p className="muted">{t("groupMailNone")}</p> : null}
      {group.members.map((member) => {
        const canRemove = group.canManage && (member.id !== group.ownerId || (user.isAdmin && group.ownerId !== viewerId));
        return (
          <div className="member-row" key={member.id}>
            <span>{member.nickname}</span>
            {canRemove && pendingId === member.id ? (
              <button className="danger" type="button" disabled={busy} onClick={() => void removeMember(member.id)}>
                {t("removeFromGroup")}
              </button>
            ) : null}
            {canRemove && pendingId !== member.id ? (
              <button className="ghost" type="button" onClick={() => setPendingId(member.id)}>
                {t("removeFromGroup")}
              </button>
            ) : null}
          </div>
        );
      })}
      {group.canEmail ? (
        <form className="stack" onSubmit={addMember}>
          <label>
            {t("addPal")}
            <select value={palId} onChange={(event) => setPalId(event.target.value)} required>
              <option value="">{t("addPal")}</option>
              {choices.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.nickname}
                </option>
              ))}
            </select>
          </label>
          {choices.length === 0 ? <p className="muted">{t("noPalsToAdd")}</p> : null}
          <button className="primary" type="submit" disabled={busy || palId === ""}>
            {t("addToGroup")}
          </button>
        </form>
      ) : null}
      {error ? <p className="alert">{t(error)}</p> : null}
      {group.canManage && confirming ? (
        <>
          <p className="alert">{t("deleteGroupConfirm", { name: group.name })}</p>
          <button className="danger" type="button" disabled={busy} onClick={() => void removeGroup()}>
            {t("deleteGroup")}
          </button>
          <button className="ghost" type="button" onClick={() => setConfirming(false)}>
            {t("keepGroup")}
          </button>
        </>
      ) : null}
      {group.canManage && !confirming ? (
        <button className="danger" type="button" onClick={() => setConfirming(true)}>
          {t("deleteGroup")}
        </button>
      ) : null}
    </article>
  );
}
