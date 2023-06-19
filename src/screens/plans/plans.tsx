import styles from './plans.module.scss';
import { PriceCard } from '../../components/price-card/price-card';
import { MainPriceCard } from '../../components/main-price-card/main-price-card';


export function Plans() {
    return (
        <div style={{backgroundColor: "#f5f7f9"}}>
            <div className={styles.titleContainer}>
                <h1 style={{textAlign:'center'}}>Choose your plan</h1>
                <text>Start managing your customer's reviews faster and better</text>
            </div>
            <div className={styles.cardContainer}>
                <PriceCard type="Starter" price="Free" placeholder="Get started" options={["Scan your reviews (10)", "Access to basic information", "Get the rating", "Analytic diagrams"]} />
                <MainPriceCard type="Pro" price="$29" options={["Scan your reviews", "Access to basic information", "Get the rating", "Analytic diagrams", "Download the analysis"]} placeholder='Get the plan'/>
                <PriceCard type="Enterprise" price="Custom" placeholder="Contact us" options={["Scan your reviews", "Access to basic information", "Get the rating", "Analytic diagrams", "Download the analysis", "Powerful product analysis"]} />
            </div>
        </div>
    );
  }
