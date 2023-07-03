import styles from './plans.module.scss';
import { PriceCard } from '../../components/price-card/price-card';
import { MainPriceCard } from '../../components/main-price-card/main-price-card';
import { PrivacyPolicy } from '../../components/privacy-policy/privacy-policy';


export function Privacy() {
    return (
        <div style={{backgroundColor: "#f5f7f9"}}>
            <PrivacyPolicy />

        </div>
    );
  }
