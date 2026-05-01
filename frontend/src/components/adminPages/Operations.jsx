import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './admin.css';

const Operations = () => {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === 'dark';

  const actions = [
    {
      title: "Add New Book",
      desc: "Upload cover to Cloudinary, set details, and link genres.",
      icon: "fa-plus-circle",
      color: "border-blue-500",
      lightBg: "bg-white",
      lightShadow: "shadow-blue-100/50", 
      hoverBg: "group-hover:bg-blue-500/10",
      path: "/admin/add-book"
    },
    {
      title: "Edit Inventory",
      desc: "Change book prices, titles, or update genre relevance scores.",
      icon: "fa-pen-to-square",
      color: "border-amber-500",
      lightBg: "bg-white",
      lightShadow: "shadow-amber-100/50",
      hoverBg: "group-hover:bg-amber-500/10",
      path: "/admin/edit-inventory"
    },
    {
      title: "Manage Genres",
      desc: "Add new categories or delete unused genres from the list.",
      icon: "fa-tags",
      color: "border-emerald-500",
      lightBg: "bg-white",
      lightShadow: "shadow-emerald-100/50",
      hoverBg: "group-hover:bg-emerald-500/10",
      path: "/admin/manage-genres"
    },
    {
      title: "User Permissions",
      desc: "View users like Ashrith and manage admin access.",
      icon: "fa-users-gear",
      color: "border-purple-500",
      lightBg: "bg-white",
      lightShadow: "shadow-purple-100/50",
      hoverBg: "group-hover:bg-purple-500/10",
      path: "/admin/users"
    }
  ];

  return (
    <div className={`main-operation-container min-h-screen w-full transition-colors duration-300 ${
      isDark ? ' text-white' : 'bg-gray-50 text-gray-800'
    }`}>
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 mt-4 px-4">
          <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Store Operations
          </h1>
          <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Welcome back, Admin. Manage your books and database relationships.
          </p>
        </header>

        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
          {actions.map((action, index) => (
            <div 
              key={index}
              onClick={() => navigate(action.path)}
              className={`
                each-container-operation
                group
                p-6 rounded-2xl border-l-4 ${action.color} 
                duration-300 cursor-pointer overflow-hidden
                ${isDark 
                  ? 'bg-[#1e1e1e] hover:bg-[#252525] border-y-[#2d2d2d] border-r-[#2d2d2d]' 
                  : `${action.lightBg} ${action.lightShadow} border-y-gray-200 border-r-gray-200 shadow-lg hover:shadow-2xl`
                }
                hover:-translate-y-2 active:scale-95 admin-operation-card
              `}
            >
              <div className="flex flex-col w-full h-full card-content-wrapper bg-transparent">
                
                {/* Header Row: Icon (Left) and Small Arrow (Right) */}
                <div className="flex items-center justify-between mb-6 w-full bg-transparent">
                  <div className={`p-4 rounded-xl transition-colors w-fit ${
                    isDark ? 'bg-gray-700' : 'bg-gray-200'
                  } ${action.hoverBg}`}>
                    <i className={`fa-solid ${action.icon} text-2xl ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    } group-hover:text-blue-500 transition-colors`}></i>
                  </div>
                  
                  {/* Small Arrow pinned to the right side */}
                  <i className={`fa-solid bg-transparent fa-arrow-right-long operation-arrow-small ${
                    isDark ? 'text-gray-600' : 'text-gray-400'
                  } group-hover:text-blue-500 transition-colors`}></i>
                </div>
                
                {/* Text Content */}
                <h3 className={`text-xl font-bold mb-2 bg-transparent ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                  {action.title}
                </h3>
                <p className={`text-sm leading-relaxed bg-transparent ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {action.desc}
                </p>

                {/* Large Background Arrow */}
                <i className={`fa-solid fa-arrow-right-long operation-arrow-large bg-transparent ${
                  isDark ? 'text-gray-700' : 'text-gray-600'
                } group-hover:text-blue-500`}></i>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Operations;