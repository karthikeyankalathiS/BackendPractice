// In-memory user storage for TeamFlow API
class User {
  constructor(id, name, email, role = 'member', avatar = null) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role; // 'admin', 'manager', 'member'
    this.avatar = avatar;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    this.isActive = true;
  }

  update(data) {
    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'createdAt') {
        this[key] = data[key];
      }
    });
    this.updatedAt = new Date().toISOString();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      avatar: this.avatar,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isActive: this.isActive
    };
  }
}

// In-memory storage
let users = [];
let nextId = 1;

// Sample data
const sampleUsers = [
  { name: 'John Doe', email: 'john@teamflow.com', role: 'admin' },
  { name: 'Jane Smith', email: 'jane@teamflow.com', role: 'manager' },
  { name: 'Mike Johnson', email: 'mike@teamflow.com', role: 'member' },
  { name: 'Sarah Wilson', email: 'sarah@teamflow.com', role: 'member' }
];

// Initialize with sample data
sampleUsers.forEach(userData => {
  const user = new User(nextId++, userData.name, userData.email, userData.role);
  users.push(user);
});

// User service functions
export const userService = {
  // Get all users
  getAll() {
    return users.filter(user => user.isActive);
  },

  // Get user by ID
  getById(id) {
    return users.find(user => user.id === parseInt(id) && user.isActive);
  },

  // Get user by email
  getByEmail(email) {
    return users.find(user => user.email === email && user.isActive);
  },

  // Create new user
  create(userData) {
    const existingUser = this.getByEmail(userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const user = new User(nextId++, userData.name, userData.email, userData.role, userData.avatar);
    users.push(user);
    return user;
  },

  // Update user
  update(id, userData) {
    const user = this.getById(id);
    if (!user) {
      throw new Error('User not found');
    }

    // Check if email is being changed and if it already exists
    if (userData.email && userData.email !== user.email) {
      const existingUser = this.getByEmail(userData.email);
      if (existingUser) {
        throw new Error('Email already exists');
      }
    }

    user.update(userData);
    return user;
  },

  // Delete user (soft delete)
  delete(id) {
    const user = this.getById(id);
    if (!user) {
      throw new Error('User not found');
    }

    user.isActive = false;
    user.updatedAt = new Date().toISOString();
    return user;
  },

  // Get users by role
  getByRole(role) {
    return users.filter(user => user.role === role && user.isActive);
  },

  // Search users
  search(query) {
    const lowerQuery = query.toLowerCase();
    return users.filter(user => 
      user.isActive && (
        user.name.toLowerCase().includes(lowerQuery) ||
        user.email.toLowerCase().includes(lowerQuery)
      )
    );
  }
};

export default User;
