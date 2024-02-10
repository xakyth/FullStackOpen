import { CoursePart } from '../types';

interface ContentProps {
  parts: CoursePart[];
}

const Content = (props: ContentProps) => {
  const courseParts = props.parts;
  return (
    <div>
      {courseParts.map((part) => {
        return (
          <p key={part.name}>
            {part.name} {part.exerciseCount}
          </p>
        );
      })}
    </div>
  );
};

export default Content;
