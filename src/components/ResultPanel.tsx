import React, { useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonImg, IonItem, IonSearchbar, IonList, IonModal, IonAvatar, IonIcon } from '@ionic/react';
import { Quiz, Flag } from '../redux/reducers/QuizReducer';
import { HistoryItem } from '../redux/reducers/UquizReducer';
import { attachProps } from '@ionic/react/dist/types/components/utils';
import { trophy, ribbon, restaurant, film, earth, peopleCircle, business, ribbonSharp } from 'ionicons/icons';
import { Theme } from '../redux/constants';

const ResultPanel: React.FC<{ 
    key:string,
    showResultPanel:boolean,
    message: string,
    historyItem: HistoryItem,
    closeResultPanel: any,
    flag: Flag,
}> = props => {

//const currentList = props.countryList.map(item => <IonItem>{{ item }}</IonItem>);
console.log('message',props.message);

const icon = props.historyItem.theme===Theme.CINEMA ? <IonIcon icon={film}></IonIcon> : 
props.historyItem.theme===Theme.FOOD ? <IonIcon icon={restaurant}></IonIcon> :
props.historyItem.theme===Theme.GEO ? <IonIcon icon={earth}></IonIcon> :
props.historyItem.theme===Theme.CELEBRITIES ? <IonIcon icon={peopleCircle}></IonIcon> :
props.historyItem.theme===Theme.ENTERPRISES ? <IonIcon icon={business}></IonIcon> :
<IonIcon icon={ribbonSharp}></IonIcon>

function badgeMessage(){
    console.log('badgeMessage');
    if(props.historyItem) {
        if(props.historyItem.score >= 80 && props.historyItem.score <90) {
           
            return `Congrat! 80% to 89% you unlocked a Bronze Badge on ${props.historyItem.country} - ${props.historyItem.theme}`
        }
        if(props.historyItem.score >= 90 && props.historyItem.score <100) {
           
            return `Congrat! 90% to 99% you unlocked a Silver Badge on ${props.historyItem.country} - ${props.historyItem.theme}`
        }
        if(props.historyItem.score === 100) {
           
            return `Congrat! 100% you unlocked the Golden Badge on ${props.historyItem.country} - ${props.historyItem.theme}`
        }
    }
    return 'Try again! You need over 80% to win a Badge'
}
  return (
    <IonModal
    id='resultPanel'
    isOpen={props.showResultPanel} 
    swipeToClose={true}
    backdropDismiss={true}
    onDidDismiss={()=>props.closeResultPanel()}
    >
    <IonCard
      onClick={()=>props.closeResultPanel()}
      >
         <IonCardHeader >
        <IonCardTitle>{props.historyItem ? props.historyItem.country : ''} - Theme: {props.historyItem ? props.historyItem.theme : ''}</IonCardTitle>
        <IonCardSubtitle>{props.historyItem ? props.historyItem.score : ''}%</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
          <div id="medal">
            <h2>{badgeMessage()}</h2>
            { props.historyItem.score >= 80 &&
             <div>
                <img src={props.flag.image}  id="badgeImg" alt="badge"></img>
                <div id="test"
                    style={{color:props.historyItem.score === 100?'gold':
                    props.historyItem.score >= 90?'silver':
                    props.historyItem.score >= 80?'darkorange':'black'

                        }}
                > 
            
                {icon}</div>
             </div>
            }
            
          </div>
      </IonCardContent>
        </IonCard>
  </IonModal>
  );
};

export default ResultPanel;