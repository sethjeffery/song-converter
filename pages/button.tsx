function getColorClass(variant: string) {
  switch(variant) {
    case 'primary': return 'from-amber-100 to-amber-500'
    case 'secondary': return 'from-white to-gray-400'
  }
}

export default function Button({
  children,
  className = '',
  variant = 'primary',
  onClick,
  ...args
}: {
  children: any,
  className?: string,
  variant?: 'primary'|'secondary',
  onClick: () => void,
  [x: string]: any
}) {
  return (
    <button className={`bg-gradient-to-br ${getColorClass(variant)} rounded-md shadow-md p-[2px] ${className}`} onClick={onClick} {...args}>
      <span className="bg-stone-100 rounded px-8 py-2 block transition-colors hover:bg-transparent hover:text-black dark:bg-slate-800">
        {children}
      </span>
    </button>
  )
}
