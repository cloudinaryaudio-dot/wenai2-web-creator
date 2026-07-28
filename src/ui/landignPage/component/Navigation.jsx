import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Heart, Calendar, Image, MessageSquare, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Mobile Bottom Navigation (Tab Bar)
 * Glassmorphism design with active state glow
 */
export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Heart, label: "Home" },
    { path: "/events", icon: Calendar, label: "Events" },
    { path: "/gallery", icon: Image, label: "Gallery" },
    { path: "/rsvp", icon: MessageSquare, label: "RSVP" },
    { path: "/admin", icon: Settings, label: "Admin" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-2xl border-t border-border/50 shadow-2xl md:hidden">
      <div className="flex justify-around items-center h-20 px-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} className="flex-1 group">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "flex flex-col items-center gap-1.5 h-16 w-full py-3 px-2 rounded-xl transition-all duration-300 relative overflow-hidden",
                  isActive 
                    ? "text-primary bg-gradient-to-br from-primary/20 to-secondary/20 shadow-lg shadow-primary/25 backdrop-blur-sm border border-primary/30" 
                    : "hover:bg-muted/50 active:bg-muted/70 hover:scale-105"
                )}
              >
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full opacity-75 blur-sm animate-pulse" />
                )}
                
                <Icon className={cn(
                  "w-6 h-6 transition-all duration-300",
                  isActive ? "drop-shadow-lg shadow-primary/50" : "group-hover:scale-110"
                )} />
                <span className={cn(
                  "text-xs font-semibold tracking-tight transition-all",
                  isActive ? "scale-105" : "group-hover:scale-105"
                )}>
                  {item.label}
                </span>
              </Button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

/**
 * Desktop Top Navigation (Horizontal Bar)
 * Sticky header with logo + navigation + responsive collapse
 */
export const DesktopNavigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/events", label: "Events" },
    { path: "/gallery", label: "Gallery" },
    { path: "/rsvp", label: "RSVP" },
    { path: "/admin", label: "Admin" },
  ];

  return (
    <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-2xl border-b border-border/50 shadow-xl">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="group flex items-center gap-3 text-2xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-primary bg-clip-text text-transparent hover:scale-105 transition-all duration-300"
        >
          <Heart className="w-8 h-8 group-hover:fill-rose-500 group-hover:text-rose-500 transition-all duration-300 animate-pulse" />
          <span className="tracking-tight hidden lg:inline">Our Wedding</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={location.pathname === item.path ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "px-4 py-2 font-semibold tracking-tight rounded-xl transition-all duration-300 shadow-md hover:shadow-lg",
                  location.pathname === item.path
                    ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-primary/25 hover:shadow-primary/40 border border-primary/30"
                    : "hover:bg-muted/60 hover:text-primary hover:shadow-md active:scale-95"
                )}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>

        {/* Responsive Collapse Indicator */}
        <div className="lg:hidden flex items-center gap-2 text-muted-foreground">
          <ChevronRight className="w-5 h-5" />
          <span className="text-xs font-medium tracking-wide">Desktop</span>
        </div>
      </div>
    </nav>
  );
};
