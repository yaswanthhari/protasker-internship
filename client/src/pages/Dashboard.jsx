import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { 
  Plus, 
  LogOut, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Trash2, 
  LayoutDashboard,
  Filter,
  MoreVertical
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium' });

  const API_URL = 'http://localhost:5000/api/tasks';

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data.data);
    } catch (err) {
      console.error('Error fetching tasks', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, newTask);
      setShowModal(false);
      setNewTask({ title: '', description: '', priority: 'medium' });
      fetchTasks();
    } catch (err) {
      console.error('Error creating task', err);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(`${API_URL}/${id}`, { status });
      fetchTasks();
    } catch (err) {
      console.error('Error updating task', err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task', err);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
      {/* Sidebar/Navigation */}
      <nav className="glass" style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '70px', zIndex: 100, padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LayoutDashboard size={24} color="white" />
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: '700' }}>ProTasker</h1>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '14px', fontWeight: '600' }}>{user?.name}</p>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{user?.email}</p>
          </div>
          <button onClick={logout} className="glass" style={{ padding: '8px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--danger)' }}>
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container" style={{ paddingTop: '110px', paddingBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h2 style={{ fontSize: '28px', marginBottom: '4px' }}>My Tasks</h2>
            <p style={{ color: 'var(--text-secondary)' }}>You have {tasks.length} tasks in total</p>
          </div>
          <button onClick={() => setShowModal(true)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={20} /> Add New Task
          </button>
        </div>

        {loading ? (
          <div className="flex-center" style={{ height: '200px' }}>
            <div className="animate-spin" style={{ width: '40px', height: '40px', border: '3px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {tasks.length === 0 ? (
              <div className="glass-card flex-center" style={{ gridColumn: '1/-1', height: '200px', flexDirection: 'column', gap: '16px' }}>
                <Clock size={48} color="var(--text-secondary)" />
                <p style={{ color: 'var(--text-secondary)' }}>No tasks found. Create one to get started!</p>
              </div>
            ) : (
              tasks.map(task => (
                <div key={task._id} className="glass-card animate-fade-in" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: getPriorityColor(task.priority) }}></div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', tracking: '0.05em', color: getPriorityColor(task.priority), background: `${getPriorityColor(task.priority)}15`, padding: '4px 8px', borderRadius: '4px' }}>
                      {task.priority} Priority
                    </span>
                    <button onClick={() => handleDeleteTask(task._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', textDecoration: task.status === 'completed' ? 'line-through' : 'none', color: task.status === 'completed' ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
                    {task.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.5' }}>
                    {task.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => handleUpdateStatus(task._id, task.status === 'completed' ? 'todo' : 'completed')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: task.status === 'completed' ? 'var(--success)' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '500' }}
                      >
                        {task.status === 'completed' ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                        {task.status === 'completed' ? 'Completed' : 'Mark Done'}
                      </button>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* Add Task Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '32px' }}>
            <h2 style={{ marginBottom: '24px' }}>Create New Task</h2>
            <form onSubmit={handleCreateTask}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Title</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Task title..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  required
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Description</label>
                <textarea 
                  className="input-field" 
                  rows="3" 
                  placeholder="What needs to be done?"
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  required
                  style={{ resize: 'none' }}
                />
              </div>
              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Priority</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {['low', 'medium', 'high'].map(p => (
                    <button 
                      key={p}
                      type="button"
                      onClick={() => setNewTask({...newTask, priority: p})}
                      style={{ 
                        flex: 1, 
                        padding: '10px', 
                        borderRadius: '10px', 
                        border: '1px solid var(--border-color)', 
                        background: newTask.priority === p ? getPriorityColor(p) : 'transparent',
                        color: newTask.priority === p ? 'white' : 'var(--text-secondary)',
                        fontSize: '13px',
                        fontWeight: '600',
                        textTransform: 'capitalize',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn glass" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>Create Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
