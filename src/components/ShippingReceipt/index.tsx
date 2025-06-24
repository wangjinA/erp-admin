import { ReactNode } from "react";

export default ({ children, color = 'red' }: {
  children: ReactNode;
  color?: 'red' | 'green';
}) => {
  const classNames = color === 'red' ? 'text-red-400 border-red-400' : 'text-green-400 border-green-400'
  return <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45 pointer-events-none">
    <span className={`${classNames} text-1xl font-black opacity-60 whitespace-nowrap border-4  border-dashed px-10 py-3 rounded-lg bg-red-50/30 backdrop-blur-sm`}>{children}</span>
  </div>
}