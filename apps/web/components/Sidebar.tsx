"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Users,
  GraduationCap,
  User,
  Sparkles,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

const learnCategories = [
  { id: "math", label: "Mathematics", icon: "π" },
  { id: "physics", label: "Physics", icon: "⚡" },
  { id: "coding", label: "Coding", icon: "💻" },
];

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLearnExpanded, setIsLearnExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleLearn = () => setIsLearnExpanded(!isLearnExpanded);

  return (
    <motion.aside
      initial={{ width: 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "relative h-screen glass border-r border-primary/20 flex flex-col",
        className
      )}
    >
      {/* Header - SingulynAI Branding */}
      <div className="p-6 border-b border-primary/20">
        <motion.div
          className="flex items-center justify-between"
          initial={false}
        >
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                key="brand"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3"
              >
                <div className="relative">
                  <Sparkles className="w-8 h-8 text-primary" />
                  <motion.div
                    className="absolute inset-0 rounded-full glow-primary"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-primary text-glow-primary font-rajdhani">
                    SingulynAI
                  </h1>
                  <p className="text-xs text-foreground/60">Cognitive Super-App</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-primary/10 transition-colors text-primary"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </motion.div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 space-y-2">
        {/* Add Person/Mentor */}
        <SidebarItem
          icon={<UserPlus className="w-5 h-5" />}
          label="Add Person/Mentor"
          isCollapsed={isCollapsed}
          onClick={() => {}}
        />

        {/* Search for Person (shown when Add Person is clicked) */}
        <AnimatePresence>
          {!isCollapsed && searchQuery !== undefined && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-3 py-2"
            >
              <input
                type="text"
                placeholder="Search mentors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 bg-muted/50 border border-primary/20 rounded-lg text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:glow-primary transition-all"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Create Persona */}
        <SidebarItem
          icon={<Users className="w-5 h-5" />}
          label="Create Persona"
          isCollapsed={isCollapsed}
          onClick={() => {}}
        />

        {/* Learn with AI */}
        <div>
          <SidebarItem
            icon={<GraduationCap className="w-5 h-5" />}
            label="Learn with AI"
            isCollapsed={isCollapsed}
            onClick={toggleLearn}
            hasDropdown
            isExpanded={isLearnExpanded}
          />

          {/* Learn Categories Dropdown */}
          <AnimatePresence>
            {isLearnExpanded && !isCollapsed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="ml-4 mt-2 space-y-1 border-l border-primary/20 pl-4"
              >
                {learnCategories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ x: 4 }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-colors"
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span>{category.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* New Chat */}
        <SidebarItem
          icon={<Plus className="w-5 h-5" />}
          label="New Chat"
          isCollapsed={isCollapsed}
          onClick={() => {}}
          highlight
        />
      </nav>

      {/* User Profile - Bottom */}
      <div className="p-4 border-t border-primary/20">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={cn(
            "flex items-center gap-3 p-3 rounded-lg glass-strong cursor-pointer hover:bg-primary/10 transition-colors",
            isCollapsed && "justify-center"
          )}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary">
            <User className="w-6 h-6 text-background" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex-1"
              >
                <p className="text-sm font-medium text-foreground">User Profile</p>
                <p className="text-xs text-foreground/60">View & Settings</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.aside>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  onClick?: () => void;
  hasDropdown?: boolean;
  isExpanded?: boolean;
  highlight?: boolean;
}

function SidebarItem({
  icon,
  label,
  isCollapsed,
  onClick,
  hasDropdown,
  isExpanded,
  highlight,
}: SidebarItemProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all group relative",
        highlight
          ? "bg-primary/20 text-primary hover:bg-primary/30 glow-primary"
          : "text-foreground/80 hover:text-foreground hover:bg-primary/10",
        isCollapsed && "justify-center"
      )}
    >
      <div className={cn("transition-colors", highlight && "text-primary")}>
        {icon}
      </div>
      <AnimatePresence>
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex-1 text-left text-sm font-medium"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      {hasDropdown && !isCollapsed && (
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronLeft className="w-4 h-4 -rotate-90" />
        </motion.div>
      )}

      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <div className="absolute left-full ml-2 px-3 py-2 bg-muted glass-strong rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
          {label}
        </div>
      )}
    </motion.button>
  );
}
