// In-memory project storage for TeamFlow API
class Project {
  constructor(id, name, description, ownerId, status = 'planning') {
    this.id = id;
    this.name = name;
    this.description = description;
    this.ownerId = ownerId;
    this.status = status; // 'planning', 'active', 'completed', 'cancelled'
    this.members = [ownerId]; // Array of user IDs
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    this.startDate = null;
    this.endDate = null;
    this.budget = null;
  }

  update(data) {
    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'createdAt' && key !== 'ownerId') {
        this[key] = data[key];
      }
    });
    this.updatedAt = new Date().toISOString();
  }

  addMember(userId) {
    if (!this.members.includes(userId)) {
      this.members.push(userId);
      this.updatedAt = new Date().toISOString();
    }
  }

  removeMember(userId) {
    if (userId !== this.ownerId) {
      this.members = this.members.filter(id => id !== userId);
      this.updatedAt = new Date().toISOString();
    }
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      ownerId: this.ownerId,
      status: this.status,
      members: this.members,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      startDate: this.startDate,
      endDate: this.endDate,
      budget: this.budget
    };
  }
}

// In-memory storage
let projects = [];
let nextId = 1;

// Sample data
const sampleProjects = [
  { name: 'Website Redesign', description: 'Complete redesign of company website', ownerId: 1 },
  { name: 'Mobile App Development', description: 'Build iOS and Android app', ownerId: 2 },
  { name: 'Database Migration', description: 'Migrate to new database system', ownerId: 1 }
];

// Initialize with sample data
sampleProjects.forEach(projectData => {
  const project = new Project(nextId++, projectData.name, projectData.description, projectData.ownerId);
  projects.push(project);
});

// Project service functions
export const projectService = {
  // Get all projects
  getAll() {
    return projects;
  },

  // Get project by ID
  getById(id) {
    return projects.find(project => project.id === parseInt(id));
  },

  // Get projects by owner
  getByOwner(ownerId) {
    return projects.filter(project => project.ownerId === parseInt(ownerId));
  },

  // Get projects by status
  getByStatus(status) {
    return projects.filter(project => project.status === status);
  },

  // Create new project
  create(projectData) {
    const project = new Project(
      nextId++,
      projectData.name,
      projectData.description,
      projectData.ownerId,
      projectData.status
    );
    projects.push(project);
    return project;
  },

  // Update project
  update(id, projectData) {
    const project = this.getById(id);
    if (!project) {
      throw new Error('Project not found');
    }

    project.update(projectData);
    return project;
  },

  // Delete project
  delete(id) {
    const projectIndex = projects.findIndex(project => project.id === parseInt(id));
    if (projectIndex === -1) {
      throw new Error('Project not found');
    }

    const deletedProject = projects[projectIndex];
    projects.splice(projectIndex, 1);
    return deletedProject;
  },

  // Add member to project
  addMember(projectId, userId) {
    const project = this.getById(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    project.addMember(parseInt(userId));
    return project;
  },

  // Remove member from project
  removeMember(projectId, userId) {
    const project = this.getById(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    project.removeMember(parseInt(userId));
    return project;
  }
};

export default Project;
