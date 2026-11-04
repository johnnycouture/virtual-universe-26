---
name: issue-to-pr
description: Read an open issue, propose a fix, and open a draft pull request for review. Use when asked to turn an issue into a suggested fix or pull request.
---

# Issue to PR

Turn one open issue into a suggested fix that a person reviews. These are the
same `gh` commands you ran by hand in Section 1.

1. Confirm the learner's fork target and push remote established in this
   session. Inspect `git remote -v`, verify the selected destination with
   `gh repo view <fork-url> --json nameWithOwner,parent`, and confirm ownership or
   write access. Origin may still be the event repository. Use
   `GH_REPO=<verified-owner/repo>` for every GitHub CLI operation and push only to
   the explicitly verified fork remote, never implicitly to origin.
   - If no fork destination is ready, stop before edits or resource creation.
     Offer to prepare it in this same checkout with approval, preserving origin,
     other remotes, and local work. Do not open or switch sessions.
2. Pick the issue. Use the number you were given, or list open issues and ask:
   `gh issue list --state open`
3. Read the issue and the code it mentions: `gh issue view <n>`
4. Create a branch: `git switch -c fix/issue-<n>`
5. If the fix depends on a library, framework, or API you are not sure about,
   look it up with the Context7 MCP connector instead of relying on memory:
   call `context7-resolve-library-id`, then `context7-query-docs`.
   - Send only public documentation queries, for example "fsPromises.readFile
     UTF-8 encoding". Never include repository code, issue text, secrets, or
     private data in a query.
   - Note the library ID and documentation source URL for each lookup you use.
   - If the Context7 tools are not available in this session, or a lookup
     fails, say so plainly. Do not pretend a lookup succeeded and do not
     substitute a web search or answer from memory as if it were documented.
6. Make the smallest change that fixes the issue, and run the project's tests
   if it has any.
7. Run the built-in `/security-review` skill on your changes before
   committing. Fix every HIGH or CRITICAL finding and re-run it until none
   remain. List any MEDIUM or LOW findings in the pull request body.
8. Commit only the files you changed for this issue, push the branch to the
   fork, and open a draft pull request that closes the issue:
   `gh pr create --draft --title "Fix #<n>: <issue title>" --body "<body>"`
   Start the body with "Closes #<n>", then add a short summary and a
   "How to test" section with the exact commands a reviewer can run.
   If you used Context7, add a "Documentation sources" section listing the
   relevant sources. If a lookup was needed but the connector was unavailable,
   state that in the PR instead. Include a "Security review" section with the
   remaining MEDIUM and LOW findings, or "No findings".
9. Ask before commenting on the issue with what changed and how to test it.
   Report the exact issue, PR, and branch. Leave this PR branch checked out so
   the learner can review it in the same session; do not switch branches.

## Rules

- Never merge, approve, or close anything. A person reviews the pull request.
- If the fix is unclear, comment on the issue with your questions instead of guessing.
- Stage only the files you changed for this issue.
