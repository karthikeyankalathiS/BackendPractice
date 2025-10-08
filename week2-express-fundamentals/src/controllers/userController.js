import { userService } from '../models/User.js';

// Get all users
export const getAllUsers = (req, res) => {
  try {
    const { role, search } = req.query;
    let users;

    if (search) {
      users = userService.search(search);
    } else if (role) {
      users = userService.getByRole(role);
    } else {
      users = userService.getAll();
    }

    res.json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
};

// Get user by ID
export const getUserById = (req, res) => {
  try {
    const { id } = req.params;
    const user = userService.getById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
      error: error.message
    });
  }
};

// Create new user
export const createUser = (req, res) => {
  try {
    const { name, email, role, avatar } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Role validation
    const validRoles = ['admin', 'manager', 'member'];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be one of: admin, manager, member'
      });
    }

    const userData = { name, email, role: role || 'member', avatar };
    const user = userService.create(userData);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    if (error.message.includes('already exists')) {
      return res.status(409).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create user',
      error: error.message
    });
  }
};

// Update user
export const updateUser = (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Role validation if provided
    if (updateData.role) {
      const validRoles = ['admin', 'manager', 'member'];
      if (!validRoles.includes(updateData.role)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid role. Must be one of: admin, manager, member'
        });
      }
    }

    // Email validation if provided
    if (updateData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(updateData.email)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format'
        });
      }
    }

    const user = userService.update(id, updateData);

    res.json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }

    if (error.message.includes('already exists')) {
      return res.status(409).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update user',
      error: error.message
    });
  }
};

// Delete user
export const deleteUser = (req, res) => {
  try {
    const { id } = req.params;
    const user = userService.delete(id);

    res.json({
      success: true,
      message: 'User deleted successfully',
      data: user
    });
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
      error: error.message
    });
  }
};

// Get user statistics
export const getUserStats = (req, res) => {
  try {
    const users = userService.getAll();
    const stats = {
      total: users.length,
      byRole: {
        admin: users.filter(u => u.role === 'admin').length,
        manager: users.filter(u => u.role === 'manager').length,
        member: users.filter(u => u.role === 'member').length
      },
      active: users.filter(u => u.isActive).length
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user statistics',
      error: error.message
    });
  }
};
