import React from 'react';
import { ActiveView } from './header';

interface HeaderItemProps {
  active: boolean;
  icon: React.ReactNode;
  text: string;
  activeView: ActiveView;
}

function getIconTextColor (active: boolean, activeView: ActiveView) {
  switch (true) {
  case activeView === ActiveView.statistic && active:
    return 'text-theme-300';
  case activeView === ActiveView.calendar && active:
    return 'text-theme-950';
  case active || activeView === ActiveView.statistic || activeView === ActiveView.calendar:
    return 'text-theme-50';
  default:
    return 'text-theme-950';
  }
}

function getBackgroundColor (active: boolean, activeView: ActiveView) {
  switch (true) {
  case (activeView === ActiveView.statistic && active) || (activeView === ActiveView.calendar && active):
    return 'bg-theme-50';
  case active:
    return 'bg-theme-950';
  default:
    return '';
  }
}

export function HeaderItem ({ active, icon, text, activeView }: HeaderItemProps) {
  const iconTextColor = getIconTextColor(active, activeView);
  const backgroundColor = getBackgroundColor(active, activeView);

  return (
    <div className={`p-4 ${backgroundColor} rounded-lg flex flex-col items-center`}>
      <div className={`font-secondary ${iconTextColor}`}>{icon}</div>
      <div className={`font-secondary ${iconTextColor}`}>{text}</div>
    </div>
  );
}
