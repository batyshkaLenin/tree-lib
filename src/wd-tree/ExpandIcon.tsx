import React from 'react'

interface Props {
  className?: string
}

const ExpandIcon: React.FC<Props> = props => {
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 9 5.249"
    >
      <path
        fill="currentColor"
        d="M0 .75C0 .67.03.6.09.54L.54.09C.6.03.67 0 .75 0s.146.03.207.09L4.5 3.634 8.044.09c.06-.06.13-.09.207-.09s.148.03.21.09l.45.45c.06.06.09.13.09.21s-.03.146-.09.206L4.708 5.158c-.06.06-.13.09-.208.09s-.147-.03-.208-.09L.09.956C.03.896 0 .826 0 .75z"
      />
    </svg>
  )
}

export default ExpandIcon
