'use client'

import React, { useState } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTitle,
  SidebarDescription,
  SidebarFooter
} from '@/components/ui/sidebar'
import { BsFillSunFill } from 'react-icons/bs'

const DashboardSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <Sidebar isExpanded={isExpanded} toggleExpand={setIsExpanded}>
      <SidebarContent>
        <SidebarHeader>
          <SidebarTitle>
            {isExpanded ? 'Sidebar Title' : <BsFillSunFill />}
          </SidebarTitle>
        </SidebarHeader>
        <SidebarDescription>
          {isExpanded ? 'Sidebar Title' : <BsFillSunFill />}
        </SidebarDescription>
        {isExpanded ? 'Sidebar Title' : <BsFillSunFill />}
        <SidebarFooter>
          {isExpanded ? 'Sidebar Title' : <BsFillSunFill />}
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}

export default DashboardSidebar
