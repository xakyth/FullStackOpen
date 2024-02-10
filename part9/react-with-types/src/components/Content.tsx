import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
  parts: CoursePart[];
}

const Content = (props: ContentProps) => {
  const courseParts = props.parts;
  return (
    <div>
      {courseParts.map((part) => {
        return <Part key={part.name} part={part} />;
      })}
    </div>
  );
};

export default Content;
