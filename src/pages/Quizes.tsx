import React, { useContext, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSlides, IonSlide } from '@ionic/react';
import './Quizes.css';
import { RootState } from '../redux/reducers';
import { useSelector, useDispatch } from 'react-redux';
import HistoryElement from '../components/HistoryElement';
import { HistoryItem } from '../redux/reducers/UquizReducer';
import FlagSlide from '../components/FlagSlide';
import { Flag } from '../redux/reducers/QuizReducer';
import  ActionCreators  from "../redux/actions";

const Quizes: React.FC = () => {


  const uQuizState = (state:RootState) => ({
    historyItems: state.uQuiz.historyItems,
  });

  const { historyItems } = useSelector(uQuizState);

  const historyContent =   
  historyItems.map((item: HistoryItem) => {   
    return (<HistoryElement 
      key = {item.id} 
      historyItem = {item}
    />)
    })


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar id="badgesToolbar">
          <IonTitle>History</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="backGroundStyle">

        {
          historyItems && historyItems.length>0 && historyContent
        }
        
      </IonContent>
    </IonPage>
  );
};

export default Quizes;
