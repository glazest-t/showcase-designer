import React, {useState} from 'react';
import {Text,Button,Icon,Switch,Tile,TileHeader,Link,Badge,InfoDialogWindow,ActionMenu,WarningDialogWindow} from '@reactor/reactor';
import {Table} from '@reactor/table';
import {services} from './data';
import ServiceDetails from './ServiceDetails';
import StorefrontLink from './StorefrontLink';

const feedNames=['Завтрак «Шведский стол»','Вход в термальную зону','Парковка','Аренда квадроцикла','Обед комплексный'];

export default function MainPage({sections,setSections,onEdit,onSaved}){
 const [feed,setFeed]=useState(feedNames.map((name,i)=>({id:String(i),name,visible:true})));
 const [details,setDetails]=useState(null);
 const [deleting,setDeleting]=useState(null);
 const sectionHint="Скроет раздел с витрины. Привязанные к нему услуги останутся видны в ленте";
 const serviceHint="Скроет услугу только из ленты. В разделах она останется видна гостям";
 const title=(text,subtitle,actions)=><TileHeader text={text} subtitle={<Text text={subtitle} typography="promo-paragraph"/>} actions={actions}/>;
 return <>
  <main className="page">
   <div className="page-heading"><Text text="Настройки показа" typography="page-title"/><Text text="Задайте структуру и наполнение витрины, чтобы помочь гостям найти нужную услугу" typography="subtitle"/></div>
   <div className="main-tile sections-tile"><Tile header={title('Разделы','Кнопки быстрого перехода к предложениям на витрине',<Button icon="add" text="Создать раздел" onClick={()=>onEdit()}/>)}>
    <Table key={JSON.stringify(sections.map(s=>s.name))} width="100%" fixed draggable stickyNoTop head={{key:'sections-head',cells:[{content:'Видимость',width:108},{content:'Раздел',width:'39.23%'},{content:'Привязано услуг'},{content:'Действие',width:193,hAlign:'right'}]}} rows={sections.map((s,i)=>({key:s.name,cells:[
      <Switch hint={sectionHint} accent={s.visible} selected={s.visible} onClick={()=>{setSections(prev=>prev.map((v,j)=>i===j?{...v,visible:!v.visible}:v));onSaved()}}/>,
      <Link text={s.name} onClick={()=>onEdit(s,i)}/>,
      <Badge color="info" filled text={String(s.ids.length)} hint={{html:true,text:services.filter(service=>s.ids.includes(service.id)).map(service=>"<p>"+service.name.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")+"</p>").join("")||"Нет привязанных услуг"}}/>,
      {content:<ActionMenu actions={[{icon:"edit",text:"Редактировать",onClick:()=>onEdit(s,i)},{icon:"delete",text:"Удалить",onClick:()=>setDeleting(s)}]}/>,hAlign:'right'}
    ]}))}/>
   </Tile></div>
   <div className="main-tile feed-tile"><Tile header={title('Лента всех услуг','Общий порядок карточек при обычном скролле витрины')}>
    <Table width="100%" fixed draggable stickyNoTop head={{key:'feed-head',cells:[{content:'Видимость',width:108},'Услуга',{content:'Действие',width:140,hAlign:'right'}]}} rows={feed.map(s=>({key:s.id,cells:[
     <Switch hint={serviceHint} accent={s.visible} selected={s.visible} onClick={()=>{setFeed(prev=>prev.map(v=>v.id===s.id?{...v,visible:!v.visible}:v));onSaved()}}/>,s.name,
     {content:<Button icon="eye" text="Детали" onClick={()=>setDetails(s)}/>,hAlign:'right'}
    ]}))}/>
   </Tile></div>
   <div className="page-secondary-actions"><StorefrontLink/></div>
  </main>
  <WarningDialogWindow header="Удалить раздел?" state={[deleting!==null,v=>{if(!v)setDeleting(null)}]} actions={{primary:{text:'Удалить',onClick:()=>{setSections(prev=>prev.filter(s=>s!==deleting));setDeleting(null);onSaved()}},cancel:{text:'Отмена'}}}><Text text={'Раздел «'+(deleting?.name??'')+'» будет удалён. Привязанные услуги останутся в каталоге и ленте.'}/></WarningDialogWindow>
  {details&&<ServiceDetails key={details.id} service={details} onClose={()=>setDetails(null)} onSave={updated=>{setFeed(prev=>prev.map(s=>s.id===updated.id?updated:s));setDetails(updated);onSaved()}}/>}
 </>;
}
