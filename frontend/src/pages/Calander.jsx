import React from 'react'
import { ScheduleComponent, ViewDirective, Day, Week, Agenda, WorkWeek, Month, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule'



export const Calander = () => {
  return (
    <div className=''>
      <ScheduleComponent width="700px">
        <Inject services={[Day, Week, WorkWeek, Month, Agenda,Resize, DragAndDrop]}/>
      </ScheduleComponent>
    </div>
  )
}
