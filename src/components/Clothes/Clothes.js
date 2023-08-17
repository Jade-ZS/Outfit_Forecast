import './Clothes.css';

export default function Clothes() {
  const stripSweaterURL = 'https://www.madewell.com/conway-pullover-sweater-in-mixed-stripe-NM588.html?dwvar_NM588_color=SR3206&cgid=labelswelove-mwl#srcCode=Paid_Search%7CSearch_Brand%7CGoogle%7CPMG%5EG%5EMW_BR_US_EN_X_Athleisure_Broad_X%5Emadewell+mwl&utm_source=google&utm_medium=cpc&utm_content=brand_search&utm_campaign=MW_BR_US_EN_X_Athleisure_Broad_X&utm_term=madewell+mwl&NoPopUp=True&gad=1&gclid=CjwKCAjw5_GmBhBIEiwA5QSMxJ5Nrfow8C0p3c0FXvCI0m5IEwlHfW9MGYISzJVzb3AMO78_E9ojhBoCf5cQAvD_BwE&gclsrc=aw.ds&start=13';
  const stripSweaterImg = 'https://www.madewell.com/images/NM588_SR3206_ld?wid=830&hei=1054&fmt=jpeg&fit=crop&qlt=75,1&resMode=bisharp&op_usm=0.5,1,5,0';
  
  const whiteSweaterURL = 'https://www.madewell.com/conway-pullover-sweater-NM589.html';
  const whiteSweaterImg = 'https://www.madewell.com/images/NM589_NA6817_ld?wid=1080&hei=1372&fmt=jpeg&fit=crop&qlt=75,1&resMode=bisharp&op_usm=0.5,1,5,0';



  const fall = (
    <div>
      <a href={stripSweaterURL}>
        <img className='cloth-img' src={stripSweaterImg} />
      </a>
    </div>
  );

  return (
    <div className='clothes-display'>
      {fall}
    </div>
  )
}