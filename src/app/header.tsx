import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  ArrowRightStartOnRectangleIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  HomeIcon,
  ClockIcon
} from '@heroicons/react/24/solid';
import { useUser } from './../common/hooks';
import { HeaderItem } from './headerItem';

export enum ActiveView {
  home,
  statistic,
  absence,
  task,
  calendar
}

export function AppHeader () {
  const [activeView, setActiveView] = useState<ActiveView>(ActiveView.home);
  const location = useLocation();
  const { logout } = useUser();
  const isEducator = true; // Update according to your logic
  const exitbuttoncolor = activeView === ActiveView.calendar ||
  activeView === ActiveView.statistic ? 'text-theme-50' : 'text-theme-950';

  useEffect(() => {
    switch (location.pathname) {
    case '/statistic':
      setActiveView(ActiveView.statistic);
      break;
    case '/absence':
      setActiveView(ActiveView.absence);
      break;
    case '/task':
      setActiveView(ActiveView.task);
      break;
    case '/calendar':
      setActiveView(ActiveView.calendar);
      break;
    default:
      setActiveView(ActiveView.home);
      break;
    }
  }, [location.pathname]);

  return (
    <div className={`py-6 ${activeView === ActiveView.calendar ?
      'bg-theme-950' : activeView === ActiveView.statistic ? 'bg-theme-200' : 'bg-theme-50'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-8">
          <NavLink to="/" onClick={() => setActiveView(ActiveView.home)}>
            <HeaderItem active={activeView === ActiveView.home}
              icon={<HomeIcon className="h-14 w-14" />} text="Home" activeView={activeView} />
          </NavLink>
          {isEducator && (
            <>
              <NavLink to="/statistic" onClick={() => setActiveView(ActiveView.statistic)}>
                <HeaderItem active={activeView === ActiveView.statistic}
                  icon={<ChartBarIcon className="h-14 w-14" />} text="Statistiken" activeView={activeView} />
              </NavLink>
              <NavLink to="/absence" onClick={() => setActiveView(ActiveView.absence)}>
                <HeaderItem active={activeView === ActiveView.absence}
                  icon={<ClockIcon className="h-14 w-14" />} text="Absenz" activeView={activeView} />
              </NavLink>
              <NavLink to="/task" onClick={() => setActiveView(ActiveView.task)}>
                <HeaderItem active={activeView === ActiveView.task}
                  icon={<ClipboardDocumentListIcon className="h-14 w-14" />} text="Ämtli"
                  activeView={activeView} />
              </NavLink>
            </>
          )}
          {!isEducator && (
            <NavLink to="/calendar" onClick={() => setActiveView(ActiveView.calendar)}>
              <HeaderItem active={activeView === ActiveView.calendar}
                icon={<CalendarDaysIcon className="h-14 w-14" />} text="Kalender" activeView={activeView} />
            </NavLink>
          )}
        </div>
        <div>
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            <div className="p-4">
              <ArrowRightStartOnRectangleIcon className={`h-14 w-14" ${exitbuttoncolor}`} />
              <div className={`font-secondary ${exitbuttoncolor}`}
              >Exit
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className={`w-full h-px ${activeView === ActiveView.calendar ?
        'bg-theme-50' : activeView === ActiveView.statistic ? 'bg-theme-50' : 'bg-theme-950'} my-4`}></div>
    </div>
  );
}
