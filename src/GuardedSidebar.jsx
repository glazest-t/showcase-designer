import React from 'react';
import {PopupCard,StandardActions} from '@reactor/reactor';
import {SidebarPopupWindow} from '@reactor/windows';
import classes from '../node_modules/@reactor/reactor/src/components/windows/SidebarWindow.module.scss';

// Compose Reactor's sidebar primitives so the form owns the unsaved-changes decision.
export default function GuardedSidebar({state,header,width=753,footer,actions,children}){
 const [visible,setVisible]=state;
 const close=()=>setVisible(false);
 const controls={close,canOpen:false};
 const buttons=StandardActions.footer(actions,close);
 return <SidebarPopupWindow className={`${classes.overlay} ${classes['overlay-visible']}`} mounted={visible} state={state} onClose={close} onOverlayClick={close}>
  <div className={`${classes.window} ${classes['window-active']} ${classes['window-offset-0']}`} style={{inlineSize:width}}>
   <PopupCard modal header={header} close={close} decoration={classes.card} footer={typeof footer==='function'?footer(controls,buttons):(footer??buttons)}>{children}</PopupCard>
  </div>
 </SidebarPopupWindow>;
}
