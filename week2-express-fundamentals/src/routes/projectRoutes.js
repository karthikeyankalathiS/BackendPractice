import express from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addProjectMember,
  removeProjectMember
} from '../controllers/projectController.js';

const router = express.Router();

// GET /api/projects - Get all projects (with optional query parameters)
router.get('/', getAllProjects);

// GET /api/projects/:id - Get project by ID
router.get('/:id', getProjectById);

// POST /api/projects - Create new project
router.post('/', createProject);

// PUT /api/projects/:id - Update project
router.put('/:id', updateProject);

// DELETE /api/projects/:id - Delete project
router.delete('/:id', deleteProject);

// POST /api/projects/:id/members - Add member to project
router.post('/:id/members', addProjectMember);

// DELETE /api/projects/:id/members/:userId - Remove member from project
router.delete('/:id/members/:userId', removeProjectMember);

export default router;
