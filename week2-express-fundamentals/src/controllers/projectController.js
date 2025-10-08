import { projectService } from '../models/Project.js';

// Get all projects
export const getAllProjects = (req, res) => {
  try {
    const { status, owner } = req.query;
    let projects;

    if (status) {
      projects = projectService.getByStatus(status);
    } else if (owner) {
      projects = projectService.getByOwner(owner);
    } else {
      projects = projectService.getAll();
    }

    res.json({
      success: true,
      data: projects,
      count: projects.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects',
      error: error.message
    });
  }
};

// Get project by ID
export const getProjectById = (req, res) => {
  try {
    const { id } = req.params;
    const project = projectService.getById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project',
      error: error.message
    });
  }
};

// Create new project
export const createProject = (req, res) => {
  try {
    const { name, description, ownerId, status } = req.body;

    // Validation
    if (!name || !description || !ownerId) {
      return res.status(400).json({
        success: false,
        message: 'Name, description, and ownerId are required'
      });
    }

    // Status validation
    const validStatuses = ['planning', 'active', 'completed', 'cancelled'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: planning, active, completed, cancelled'
      });
    }

    const projectData = { name, description, ownerId, status: status || 'planning' };
    const project = projectService.create(projectData);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create project',
      error: error.message
    });
  }
};

// Update project
export const updateProject = (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Status validation if provided
    if (updateData.status) {
      const validStatuses = ['planning', 'active', 'completed', 'cancelled'];
      if (!validStatuses.includes(updateData.status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Must be one of: planning, active, completed, cancelled'
        });
      }
    }

    const project = projectService.update(id, updateData);

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    if (error.message === 'Project not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update project',
      error: error.message
    });
  }
};

// Delete project
export const deleteProject = (req, res) => {
  try {
    const { id } = req.params;
    const project = projectService.delete(id);

    res.json({
      success: true,
      message: 'Project deleted successfully',
      data: project
    });
  } catch (error) {
    if (error.message === 'Project not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to delete project',
      error: error.message
    });
  }
};

// Add member to project
export const addProjectMember = (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'userId is required'
      });
    }

    const project = projectService.addMember(id, userId);

    res.json({
      success: true,
      message: 'Member added to project successfully',
      data: project
    });
  } catch (error) {
    if (error.message === 'Project not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to add member to project',
      error: error.message
    });
  }
};

// Remove member from project
export const removeProjectMember = (req, res) => {
  try {
    const { id, userId } = req.params;
    const project = projectService.removeMember(id, userId);

    res.json({
      success: true,
      message: 'Member removed from project successfully',
      data: project
    });
  } catch (error) {
    if (error.message === 'Project not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to remove member from project',
      error: error.message
    });
  }
};
