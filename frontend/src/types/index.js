/**
 * @typedef {Object} User
 * @property {string} _id
 * @property {string} email
 * @property {string} name
 * @property {Date} createdAt
 * @property {boolean} isEmailVerified
 * @property {Date} updatedAt
 * @property {string} [profilePicture]
 */

/**
 * @typedef {"admin" | "member" | "owner" | "viewer"} MemberRole
 */

/**
 * @typedef {Object} WorkspaceMember
 * @property {User} user
 * @property {MemberRole} role
 * @property {Date} joinedAt
 */

/**
 * @typedef {Object} Workspace
 * @property {string} _id
 * @property {string} name
 * @property {string} [description]
 * @property {User | string} owner
 * @property {string} color
 * @property {WorkspaceMember[]} members
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @enum {string}
 */
const ProjectStatus = {
  PLANNING: "Planning",
  IN_PROGRESS: "In Progress",
  ON_HOLD: "On Hold",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

/**
 * @typedef {"To Do" | "In Progress" | "Done"} TaskStatus
 * @typedef {"High" | "Medium" | "Low"} TaskPriority
 */

/**
 * @enum {string}
 */
const ProjectMemberRole = {
  MANAGER: "manager",
  CONTRIBUTOR: "contributor",
  VIEWER: "viewer",
};

/**
 * @typedef {Object} Subtask
 * @property {string} _id
 * @property {string} title
 * @property {boolean} completed
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} Attachment
 * @property {string} fileName
 * @property {string} fileUrl
 * @property {string} fileType
 * @property {number} fileSize
 * @property {string} uploadedBy
 * @property {Date} uploadedAt
 * @property {string} _id
 */

/**
 * @typedef {Object} Task
 * @property {string} _id
 * @property {string} title
 * @property {string} [description]
 * @property {TaskStatus} status
 * @property {Project} project
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {boolean} isArchived
 * @property {Date} dueDate
 * @property {TaskPriority} priority
 * @property {User | string} assignee
 * @property {User | string} createdBy
 * @property {User[]} assignees
 * @property {Subtask[]} [subtasks]
 * @property {User[]} [watchers]
 * @property {Attachment[]} [attachments]
 */

/**
 * @typedef {Object} ProjectMember
 * @property {User} user
 * @property {MemberRole} role
 */

/**
 * @typedef {Object} Project
 * @property {string} _id
 * @property {string} title
 * @property {string} [description]
 * @property {ProjectStatus} status
 * @property {Workspace} workspace
 * @property {Date} startDate
 * @property {Date} dueDate
 * @property {number} progress
 * @property {Task[]} tasks
 * @property {ProjectMember[]} members
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {boolean} isArchived
 */

/**
 * @typedef {Object} MemberProps
 * @property {string} _id
 * @property {User} user
 * @property {MemberRole} role
 * @property {Date} joinedAt
 */

/**
 * @typedef {"Task" | "Project" | "Workspace" | "Comment" | "User"} ResourceType
 * @typedef {
 *   "created_task" |
 *   "updated_task" |
 *   "created_subtask" |
 *   "updated_subtask" |
 *   "completed_task" |
 *   "created_project" |
 *   "updated_project" |
 *   "completed_project" |
 *   "created_workspace" |
 *   "updated_workspace" |
 *   "added_comment" |
 *   "added_member" |
 *   "removed_member" |
 *   "joined_workspace" |
 *   "added_attachment"
 * } ActionType
 */

/**
 * @typedef {Object} ActivityLog
 * @property {string} _id
 * @property {User} user
 * @property {ActionType} action
 * @property {ResourceType} resourceType
 * @property {string} resourceId
 * @property {any} details
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} CommentReaction
 * @property {string} emoji
 * @property {User} user
 */

/**
 * @typedef {Object} Comment
 * @property {string} _id
 * @property {User} author
 * @property {string} text
 * @property {Date} createdAt
 * @property {CommentReaction[]} [reactions]
 * @property {{
 *   fileName: string;
 *   fileUrl: string;
 *   fileType?: string;
 *   fileSize?: number;
 * }[]} [attachments]
 */

/**
 * @typedef {Object} StatsCardProps
 * @property {number} totalProjects
 * @property {number} totalTasks
 * @property {number} totalProjectInProgress
 * @property {number} totalTaskCompleted
 * @property {number} totalTaskToDo
 * @property {number} totalTaskInProgress
 */

/**
 * @typedef {Object} TaskTrendsData
 * @property {string} name
 * @property {number} completed
 * @property {number} inProgress
 * @property {number} todo
 */

/**
 * @typedef {Object} TaskPriorityData
 * @property {string} name
 * @property {number} value
 * @property {string} color
 */

/**
 * @typedef {Object} ProjectStatusData
 * @property {string} name
 * @property {number} value
 * @property {string} color
 */

/**
 * @typedef {Object} WorkspaceProductivityData
 * @property {string} name
 * @property {number} completed
 * @property {number} total
 */

export {
  ProjectStatus,
  ProjectMemberRole
};
