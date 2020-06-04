import React from 'react';
import { Link, Element, Events } from 'react-scroll';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Button from '@material-ui/core/Button';

export default function useScroll(element, container) {
  React.useEffect(() => {
    Events.scrollEvent.register('begin', function () {
    });
    Events.scrollEvent.register('end', function () {
    });
    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    }
  }, []);

  const AnchorLink = () => (
    <Link
      activeClass="active"
      to={element}
      spy={true}
      smooth={true}
      duration={50}
      containerId={container}
      style={{ position: 'absolute', right: '0px', bottom: '78px' }}
    >
      <Button size="small">
        <ArrowDownwardIcon />
      </Button>
    </Link>
  );

  return [AnchorLink, Element];
}
