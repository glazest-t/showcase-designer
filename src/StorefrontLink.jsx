import React, {useState} from 'react';
import {Button,Field,InfoDialogWindow,Text,Link} from '@reactor/reactor';

// Keep the guest address separate from the designer's URL.
const configuredUrl=import.meta.env.VITE_STOREFRONT_URL?.trim();
const storefrontUrl=configuredUrl||'https://example.com/showcase';

export default function StorefrontLink(){
 const [open,setOpen]=useState(false);
 const [status,setStatus]=useState('');
 const [copying,setCopying]=useState(false);
 async function copy(){
  setCopying(true);
  try{
   await navigator.clipboard.writeText(storefrontUrl);
   setStatus('Ссылка скопирована');
  }catch{
   setStatus('Не удалось скопировать. Выделите ссылку и скопируйте её вручную.');
  }finally{setCopying(false)}
 }
 return <>
  <Link text="Получить ссылку на витрину" onClick={()=>{setStatus('');setOpen(true)}}/>
  <InfoDialogWindow header="Ссылка на витрину" state={[open,setOpen]} footer={<Button type="default" text="Закрыть" onClick={()=>setOpen(false)}/>}>
   <div className="storefront-link-body">
    <Text text="Отправьте ссылку гостям или разместите её на сайте. По ней откроется вся витрина услуг."/>
    <div className="storefront-copy-row"><Field value={storefrontUrl} onChange={()=>{}} aria-label="Ссылка на витрину" onFocus={event=>event.target.select()}/><Button type="link" text={status==='Ссылка скопирована'?'Скопировано':'Скопировать'} disabled={copying} onClick={copy}/></div>
    {status&&<div role="status"><Text text={status} typography="caption"/></div>}
   </div>
  </InfoDialogWindow>
 </>;
}
