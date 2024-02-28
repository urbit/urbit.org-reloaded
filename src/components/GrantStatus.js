import React from "react";

export default function GrantStatus(post) {
  const canceled = post?.extra?.canceled;
  const completed = post?.extra?.completed;
  const open = !canceled && !completed && post?.extra?.assignee?.[0] === "";

  if (canceled) {
    return <span className="btn bg-tertiary text-secondary">Canceled</span>;
  }
  if (completed) {
    return <span className="btn bg-tertiary text-secondary">Completed</span>;
  }
  if (open) {
    return <span className="btn bg-primary text-surface">Open</span>;
  }
  return <span className="btn bg-secondary text-tertiary">In Progress</span>;
}
