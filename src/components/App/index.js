import { useState } from 'react';
import Footer from '../Footer';
import NavBar from '../NavBar';
import './App.css'; // https://colorhunt.co/palette/0719520b666a35a29f97feed
import Template from '../Template';
import Finish from '../Finish';
import Questions from '../Questions';
import useNotification from '../../hooks/useNotification';
import Notification from '../Notification';
import useTemplate from '../../hooks/useTemplate';

const PAGES = {
  TEMPLATE: 'template',
  ADD: 'add',
  FINISH: 'finish'
}

const App = () => {
  const [errorNotification, updateError, clearError] = useNotification(5000);
  const [page, setPage] = useState(PAGES.ADD);
  const [template, setTemplate] = useTemplate()

  const notifyError = (message) => {
    updateError(message)
  }

  const saveTemplate = (template) => {
    setTemplate(template)
    setPage(PAGES.ADD)
  }

  const choosePage = (page) => {
    switch (page) {
      case PAGES.ADD:
        return <Questions />
      case PAGES.FINISH:
        return <Finish result={template} />
      case PAGES.TEMPLATE:
      default:
        return <Template
          template={template}
          notifyError={notifyError}
          saveTemplate={saveTemplate}
        />
    }
  }

  const pageNavigator = {
    template: () => setPage(PAGES.TEMPLATE),
    add: () => setPage(PAGES.ADD),
    finish: () => setPage(PAGES.FINISH),
  }

  return (
    <div className='app-container'>
      <NavBar pageNavigator={pageNavigator} />
      <Notification text={errorNotification} clear={clearError} isError={true} />
      <div className='content-container'>
        {choosePage(page)}
      </div>
      <Footer />
    </div>
  );
}

export default App;
