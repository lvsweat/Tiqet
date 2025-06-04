# Contributing to Tiqet

Thank you for considering contributing to Tiqet and taking the initiative! Please continue on to read the guidelines before submitting a pull request.

- [Issues/Bugs](#bug)
- [Feature Requests](#missing-feature)
- [Submission Guidelines](#submission)
  * [Submitting an issue](#issues)
  * [Submitting a pull request](#pull-requests)

### Why guidelines?

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.

## <a name="bug"></a> Found a Bug?

### If you find a security vulnerability, do NOT open an issue. Email lvswetnam@gmail.com instead.

In order to determine whether you are dealing with a security issue, ask yourself these two questions:
* Can I access something that's not mine, or something I shouldn't have access to?
* Can I disable something for other people?

If the answer to either of those two questions are "yes", then you're probably dealing with a security issue. Note that even if you answer "no" to both questions, you may still be dealing with a security issue, so if you're unsure, just email me at lvswetnam@gmail.com.

## <a name="missing-feature"></a> Missing a feature?
You can request a new feature by submitting a feature request. If you would like to implement a new feature, please consider the scope of the change. For changes requiring a lot of work, it's best to outline a proposal first so it can be discussed. This allows us to prevent wasted time and effort and discuss how to bring your proposed feature into the project.

## <a name="submission"></a> Submission Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for commits, pull requests, and issues submitted.

### <a name="issues"></a> Submitting an Issue

Before you submit an issue, please search the issue tracker if your problem may already exist. If a ticket already covers your case, please refrain from opening a new ticket and instead contribute to the existing ticket. If you submit an issue, please provide the required information and reproduction steps. We need those to be able to try and reproduce the bug ourselves. Without proper instructions on how to reproduce the issue you are encountering, we might be unable to fix a possible bug.

### <a name="pull-requests"></a> Submitting a Pull Request (PR)

Before you work on a PR and submit it, please pay attention to the following guidelines:

1. Search the pull requests for an open or closed PR related to your submission.
   * You don't want to duplicate existing efforts or work on something unlikely to be merged into the project.
   

2. If there is an issue describing the problem you're fixing or a discussion of a feature you are implementing, make sure to link it in the PRs body.
   * You can also add fix #<id> or fixes #<id> in the PR body where <id> is the issue id.
   * Example PR title, body and sign-off:
     ```
     fix: incorrect handling of click event

     This PR will fix #123.
     Fixes correct handling of click event when button [X] is clicked.

     Signed-off-by: James Smith <james.smith@myvalidemail.com>
     ```
   
3. If there is no issue describing the problem, create an issue first or provide a sufficient description of the bug/feature.
   * Screenshots of your changes are welcome if you worked on UI-related code.
   
4. The title of the PR should follow the commit message convention.

    * If the PR consists of multiple commits, it's good practice to follow the convention, although that is not necessarily required.

5. Please sign off each commit and your PR. It must contain your real name and a current email address (see example in item 2).

    * The sign-off should follow this pattern: Signed-off-by: My Name <myemail@example.org>
    * The sign-off certifies that you agree with the developer certificate of origin.
    * If you provide a translation, a sign-off is not necessarily required.

6. When opening a pull request, keep Allow edits and access to secrets by maintainers enabled.
