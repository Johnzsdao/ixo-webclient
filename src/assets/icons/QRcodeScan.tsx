const QRCodeScan = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 24} viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M10.4444 21.2073H7.48148C7.29878 21.2073 7.12356 21.1347 6.99436 21.0055C6.86517 20.8763 6.79259 20.7011 6.79259 20.5184V17.5555C6.79259 17.4238 6.7403 17.2976 6.64723 17.2045C6.55416 17.1114 6.42792 17.0592 6.2963 17.0592C6.16467 17.0592 6.03844 17.1114 5.94536 17.2045C5.85229 17.2976 5.8 17.4238 5.8 17.5555V20.5184C5.8 20.9644 5.97716 21.3921 6.29249 21.7074C6.60783 22.0227 7.03553 22.1999 7.48148 22.1999H10.4444C10.5761 22.1999 10.7023 22.1476 10.7954 22.0545C10.8885 21.9615 10.9407 21.8352 10.9407 21.7036C10.9407 21.572 10.8885 21.4457 10.7954 21.3527C10.7023 21.2596 10.5761 21.2073 10.4444 21.2073Z'
        fill={props.fill || '#000'}
        strokeWidth='0.4'
      />
      <path
        d='M6.2963 10.9407C6.42792 10.9407 6.55416 10.8885 6.64723 10.7954C6.7403 10.7023 6.79259 10.5761 6.79259 10.4444V7.48148C6.79259 7.29878 6.86517 7.12356 6.99436 6.99436C7.12356 6.86517 7.29878 6.79259 7.48148 6.79259H10.4444C10.5761 6.79259 10.7023 6.7403 10.7954 6.64723C10.8885 6.55416 10.9407 6.42792 10.9407 6.2963C10.9407 6.16467 10.8885 6.03844 10.7954 5.94536C10.7023 5.85229 10.5761 5.8 10.4444 5.8H7.48148C7.03553 5.8 6.60783 5.97716 6.29249 6.29249C5.97716 6.60783 5.8 7.03553 5.8 7.48148V10.4444C5.8 10.5761 5.85229 10.7023 5.94536 10.7954C6.03844 10.8885 6.16467 10.9407 6.2963 10.9407Z'
        fill={props.fill || '#000'}
        strokeWidth='0.4'
      />
      <path
        d='M20.5185 5.8H17.5556C17.4239 5.8 17.2977 5.85229 17.2046 5.94536C17.1116 6.03844 17.0593 6.16467 17.0593 6.2963C17.0593 6.42792 17.1116 6.55416 17.2046 6.64723C17.2977 6.7403 17.4239 6.79259 17.5556 6.79259H20.5185C20.7012 6.79259 20.8765 6.86517 21.0057 6.99436C21.1348 7.12356 21.2074 7.29878 21.2074 7.48148V10.4444C21.2074 10.5761 21.2597 10.7023 21.3528 10.7954C21.4459 10.8885 21.5721 10.9407 21.7037 10.9407C21.8354 10.9407 21.9616 10.8885 22.0547 10.7954C22.1477 10.7023 22.2 10.5761 22.2 10.4444V7.48148C22.2 7.03553 22.0229 6.60783 21.7075 6.29249C21.3922 5.97716 20.9645 5.8 20.5185 5.8Z'
        fill={props.fill || '#000'}
        strokeWidth='0.4'
      />
      <path
        d='M21.7037 17.0592C21.5721 17.0592 21.4459 17.1114 21.3528 17.2045C21.2597 17.2976 21.2074 17.4238 21.2074 17.5555V20.5184C21.2074 20.7011 21.1348 20.8763 21.0057 21.0055C20.8765 21.1347 20.7012 21.2073 20.5185 21.2073H17.5556C17.4239 21.2073 17.2977 21.2596 17.2046 21.3527C17.1116 21.4457 17.0593 21.572 17.0593 21.7036C17.0593 21.8352 17.1116 21.9615 17.2046 22.0545C17.2977 22.1476 17.4239 22.1999 17.5556 22.1999H20.5185C20.9645 22.1999 21.3922 22.0227 21.7075 21.7074C22.0229 21.3921 22.2 20.9644 22.2 20.5184V17.5555C22.2 17.4238 22.1477 17.2976 22.0547 17.2045C21.9616 17.1114 21.8354 17.0592 21.7037 17.0592Z'
        fill={props.fill || '#000'}
        strokeWidth='0.4'
      />
      <path
        d='M17.9066 17.9064L17.7652 17.7649L17.9066 17.9064C17.9997 17.8133 18.052 17.6871 18.052 17.5554V14.4962H19.6298C19.7614 14.4962 19.8876 14.4439 19.9807 14.3508L19.845 14.215L19.9807 14.3508C20.0738 14.2577 20.1261 14.1315 20.1261 13.9999C20.1261 13.8682 20.0738 13.742 19.9807 13.6489L19.8393 13.7904L19.9807 13.6489C19.8876 13.5559 19.7614 13.5036 19.6298 13.5036H18.052V10.4443C18.052 10.3127 17.9997 10.1864 17.9066 10.0934C17.8136 10.0003 17.6873 9.94801 17.5557 9.94801H10.4446C10.313 9.94801 10.1867 10.0003 10.0937 10.0934C10.0006 10.1864 9.94829 10.3127 9.94829 10.4443V13.5036H8.37052C8.23889 13.5036 8.11265 13.5559 8.01958 13.6489C7.92651 13.742 7.87422 13.8682 7.87422 13.9999C7.87422 14.1315 7.92651 14.2577 8.01958 14.3508C8.11265 14.4439 8.23889 14.4962 8.37052 14.4962H9.94829V17.5554C9.94829 17.6871 10.0006 17.8133 10.0937 17.9064C10.1867 17.9994 10.313 18.0517 10.4446 18.0517H17.5557C17.6873 18.0517 17.8136 17.9994 17.9066 17.9064ZM10.9409 10.9406H17.0594V13.5036H10.9409V10.9406ZM17.0594 17.0591H10.9409V14.4962H17.0594V17.0591Z'
        fill={props.fill || '#000'}
        strokeWidth='0.4'
      />
    </svg>
  )
}

export default QRCodeScan
