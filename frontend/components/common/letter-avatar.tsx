import { CSSProperties } from 'react';

type LetterAvatarProps = {
  name: string;
  size?: number;
};

const colors = [
  '#1abc9c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#16a085',
  '#27ae60',
  '#2980b9',
  '#8e44ad',
  '#2c3e50',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
  '#95a5a6',
  '#f39c12',
  '#d35400',
  '#c0392b',
  '#bdc3c7',
  '#7f8c8d',
];

const avatarStyle = (size: number, colorIndex: number): CSSProperties => ({
  backgroundColor: colors[colorIndex],
  borderRadius: '50%',
  color: '#FFF',
  font: `${size / 2}px Arial`,
  height: size,
  lineHeight: `${size}px`,
  textAlign: 'center',
  textTransform: 'uppercase',
  width: size,
});

const first = (word: string) => word.charAt(0);

const getInitials = (name: string) => {
  const nameArray = name.trim().split(' ');

  if (nameArray.length >= 2) {
    return `${first(nameArray[0])}${first(nameArray[nameArray.length - 1])}`;
  }

  return nameArray.length === 1 ? first(nameArray[0]) : 'JD';
};

const LetterAvatar = ({ name, size = 50 }: LetterAvatarProps) => {
  const initials = getInitials(name);

  const charIndex = initials.charCodeAt(0) - 65;
  const colorIndex = charIndex % 19;

  return <div style={avatarStyle(size, colorIndex)}>{initials}</div>;
};

export { LetterAvatar };
