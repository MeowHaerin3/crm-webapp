import { useState } from 'react';
import { MdPerson, MdEmail, MdPhone, MdBusiness, MdEdit, MdSave, MdCancel } from 'react-icons/md';

// Profile Page Component
function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    title: 'Sales Manager',
    company: 'Tech Solutions Inc.',
    bio: 'Experienced sales professional with 5+ years in CRM and customer relationship management.',
    location: 'New York, NY'
  });

  // Generate initials from name
  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Mock stats (replace with real data as needed)
  const stats = [
    { title: 'Contacts', value: 247, color: 'text-primary' },
    { title: 'Deals Closed', value: 45, color: 'text-success' },
    { title: 'This Month', value: 12, color: 'text-warning' }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Save logic would go here
  };

  return (
    <div className="min-h-screen bg-base-200/30 p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content">Profile</h1>
          <p className="text-base-content/60 mt-1">Manage your personal information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body text-center">
                <div className="avatar mb-4 flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary text-primary-content flex items-center justify-center text-2xl font-bold border-4 border-base-200 shadow-lg">
                    {getInitials(profile.name)}
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-base-content">{profile.name}</h2>
                <p className="text-base-content/60">{profile.title}</p>
                <p className="text-base-content/60 text-sm">{profile.company}</p>
                
                <div className="divider"></div>
                
                <div className="stats stats-vertical w-full">
                  {stats.map((stat, idx) => (
                    <div className="stat place-items-center" key={stat.title}>
                      <div className="stat-title text-base-content/60">{stat.title}</div>
                      <div className={`stat-value ${stat.color}`}>{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-base-content">Personal Information</h3>
                  {!isEditing ? (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="btn btn-primary btn-sm"
                    >
                      <MdEdit className="text-lg" />
                      Edit
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button 
                        onClick={handleSave}
                        className="btn btn-success btn-sm"
                      >
                        <MdSave className="text-lg" />
                        Save
                      </button>
                      <button 
                        onClick={() => setIsEditing(false)}
                        className="btn btn-ghost btn-sm"
                      >
                        <MdCancel className="text-lg" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <MdPerson className="text-primary" />
                        Full Name
                      </span>
                    </label>
                    {isEditing ? (
                      <input 
                        type="text" 
                        className="input input-bordered" 
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                      />
                    ) : (
                      <p className="py-2 px-3 bg-base-200/50 rounded-lg text-base-content">{profile.name}</p>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <MdEmail className="text-primary" />
                        Email
                      </span>
                    </label>
                    {isEditing ? (
                      <input 
                        type="email" 
                        className="input input-bordered" 
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                      />
                    ) : (
                      <p className="py-2 px-3 bg-base-200/50 rounded-lg text-base-content">{profile.email}</p>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <MdPhone className="text-primary" />
                        Phone
                      </span>
                    </label>
                    {isEditing ? (
                      <input 
                        type="tel" 
                        className="input input-bordered" 
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      />
                    ) : (
                      <p className="py-2 px-3 bg-base-200/50 rounded-lg text-base-content">{profile.phone}</p>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <MdBusiness className="text-primary" />
                        Job Title
                      </span>
                    </label>
                    {isEditing ? (
                      <input 
                        type="text" 
                        className="input input-bordered" 
                        value={profile.title}
                        onChange={(e) => setProfile({...profile, title: e.target.value})}
                      />
                    ) : (
                      <p className="py-2 px-3 bg-base-200/50 rounded-lg text-base-content">{profile.title}</p>
                    )}
                  </div>
                </div>

                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text font-medium text-base-content">Bio</span>
                  </label>
                  {isEditing ? (
                    <textarea 
                      className="textarea textarea-bordered h-24" 
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    />
                  ) : (
                    <p className="py-2 px-3 bg-base-200/50 rounded-lg text-base-content">{profile.bio}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Activity Section */}
            <div className="card bg-base-100 shadow-sm mt-6">
              <div className="card-body">
                <h3 className="text-xl font-semibold mb-4 text-base-content">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { action: 'Updated contact information for Sarah Johnson', time: '2 hours ago' },
                    { action: 'Closed deal with Tech Corp ($15,000)', time: '1 day ago' },
                    { action: 'Added 5 new contacts to the system', time: '2 days ago' },
                    { action: 'Completed follow-up call with Mike Brown', time: '3 days ago' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-base-200/30 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-base-content">{activity.action}</p>
                        <p className="text-sm text-base-content/60">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;