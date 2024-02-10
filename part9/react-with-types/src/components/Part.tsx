import { CoursePart } from '../types';

interface PartProps {
  part: CoursePart;
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <h2 style={{ marginBottom: 0 }}>
            {part.name} {part.exerciseCount}
          </h2>
          <i>{part.description}</i>
        </div>
      );
    case 'group':
      return (
        <div>
          <h2 style={{ marginBottom: 0 }}>
            {part.name} {part.exerciseCount}
          </h2>
          <div>project exercises {part.groupProjectCount}</div>
        </div>
      );
    case 'background':
      return (
        <div>
          <h2 style={{ marginBottom: 0 }}>
            {part.name} {part.exerciseCount}
          </h2>
          <i>{part.description}</i>
          <div>submit to {part.backgroundMaterial}</div>
        </div>
      );
    case 'special':
      return (
        <div>
          <h2 style={{ marginBottom: 0 }}>
            {part.name} {part.exerciseCount}
          </h2>
          <i>{part.description}</i>
          <div>required skills: {part.requirements.join(', ')}</div>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
