const Eye = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M7.31641 0.594162C4.13459 0.594162 1.41732 2.57325 0.316406 5.36689C1.41732 8.16053 4.13459 10.1396 7.31641 10.1396C10.4982 10.1396 13.2155 8.16053 14.3164 5.36689C13.2155 2.57325 10.4982 0.594162 7.31641 0.594162ZM7.31641 8.54871C5.56004 8.54871 4.13459 7.12325 4.13459 5.36689C4.13459 3.61053 5.56004 2.18507 7.31641 2.18507C9.07277 2.18507 10.4982 3.61053 10.4982 5.36689C10.4982 7.12325 9.07277 8.54871 7.31641 8.54871ZM7.31641 3.4578C6.26004 3.4578 5.40732 4.31053 5.40732 5.36689C5.40732 6.42325 6.26004 7.27598 7.31641 7.27598C8.37277 7.27598 9.2255 6.42325 9.2255 5.36689C9.2255 4.31053 8.37277 3.4578 7.31641 3.4578Z'
        fill={props.fill || 'none'}
      />
    </svg>
  )
}

export default Eye
