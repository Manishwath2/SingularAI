"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  UserPlus,
  Users,
  GraduationCap,
  User,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLearnDropdownOpen, setIsLearnDropdownOpen] = useState(false);

  const learnTopics = [
    { id: "math", label: "Mathematics", icon: "📐" },
    { id: "physics", label: "Physics", icon: "⚛️" },
    { id: "coding", label: "Coding", icon: "💻" },
    { id: "chemistry", label: "Chemistry", icon: "🧪" },
    { id: "biology", label: "Biology", icon: "🧬" },
  ];

  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 },
  };

  return (
    <motion.aside
      initial="expanded"
      animate={isCollapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "relative h-screen flex flex-col glass border-r border-white/10",
        className
      )}
    >
      {/* Header with Logo */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center neon-cyan">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-display font-bold text-lg neon-text-cyan">
                  SingulynAI
                </h1>
                <p className="text-xs text-foreground-muted">Cognitive Super-App</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-2">
        {/* Add Person/Mentor */}
        <div className="space-y-2">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative"
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
                <input
                  type="text"
                  placeholder="Add Person/Mentor"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {isCollapsed && (
            <button className="w-full p-3 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors">
              <Search className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Create Persona */}
        <NavItem
          icon={UserPlus}
          label="Create Persona"
          isCollapsed={isCollapsed}
          onClick={() => console.log("Create Persona")}
        />

        {/* Personas List */}
        <NavItem
          icon={Users}
          label="My Personas"
          isCollapsed={isCollapsed}
          onClick={() => console.log("My Personas")}
        />

        {/* Learn with AI */}
        <div className="relative">
          <NavItem
            icon={GraduationCap}
            label="Learn with AI"
            isCollapsed={isCollapsed}
            onClick={() => !isCollapsed && setIsLearnDropdownOpen(!isLearnDropdownOpen)}
            hasDropdown={!isCollapsed}
            isDropdownOpen={isLearnDropdownOpen}
          />

          <AnimatePresence>
            {!isCollapsed && isLearnDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2 ml-4 space-y-1 overflow-hidden"
              >
                {learnTopics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => console.log(`Learn: ${topic.label}`)}
                    className="w-full pl-8 pr-4 py-2 text-left text-sm rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2"
                  >
                    <span>{topic.icon}</span>
                    <span>{topic.label}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* User Profile - Bottom pinned */}
      <div className="p-4 border-t border-white/10">
        <div
          className={cn(
            "flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors",
            isCollapsed && "justify-center"
          )}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center neon-cyan">
            <User className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium truncate">User Profile</p>
                <p className="text-xs text-foreground-muted truncate">user@singulyn.ai</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
  onClick?: () => void;
  hasDropdown?: boolean;
  isDropdownOpen?: boolean;
}

function NavItem({
  icon: Icon,
  label,
  isCollapsed,
  onClick,
  hasDropdown = false,
  isDropdownOpen = false,
}: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group",
        isCollapsed && "justify-center"
      )}
    >
      <Icon className="w-5 h-5 flex-shrink-0 group-hover:text-primary transition-colors" />
      <AnimatePresence mode="wait">
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="text-sm font-medium flex-1 text-left"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      {hasDropdown && !isCollapsed && (
        <ChevronRight
          className={cn(
            "w-4 h-4 transition-transform",
            isDropdownOpen && "rotate-90"
          )}
        />
      )}
    </button>
  );
}
