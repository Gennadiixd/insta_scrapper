import { Events, scroller } from 'react-scroll';

export function scrollToElement(container, element) {
  let goToContainer = new Promise((resolve, reject) => {
    Events.scrollEvent.register('end', () => {
      resolve();
      Events.scrollEvent.remove('end');
    });
    scroller.scrollTo(container, {
      duration: 100,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  });
  goToContainer.then(() => scroller.scrollTo(element, {
    duration: 100,
    delay: 0,
    smooth: 'easeInOutQuart',
    containerId: container
  }));
};