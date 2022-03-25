export default function Label({
  children,
  fromClass = 'from-indigo-500',
  toClass = 'to-cyan-300',
  className = ''
}: {
  children: JSX.Element[] | JSX.Element | string,
  fromClass?: string,
  toClass?: string,
  className?: string
}) {
  return (
    <div className={`uppercase text-sm rounded-full bg-gradient-to-r ${fromClass} ${toClass} dark:font-semibold text-white dark:text-gray-800 px-4 py-1 ${className} inline-block`}>
      {children}
    </div>
  )
}
