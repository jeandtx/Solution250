import styles from './privacy-policy.module.scss';
import React from 'react';

interface CardProps {
  title: string;
  text: string;
}

const Card : React.FC<CardProps> = ({ title, text}) => (
  <div className={styles.card}>
    <h2>{title}</h2>
    <p>{text}</p>
  </div>
);

export const PrivacyPolicy = () => {

    return (
      <div>
        <div>
          <div className={styles.privacy_first_section}>
            <div className={styles.section_privacy}>
              <div className={styles.start_page}>
                <h1>Security at Solution 250</h1>
                <h2> Last updated July 02, 2023</h2> 
                <p>This privacy notice for Solution 250 ("we," "us," or "our"), describes how and why we might collect, store, use, and/or share ("process") your information when you use our services ("Services"), such as when you:</p>
                <ul>
                  <li>Visit our website at http://www.solution250.com, or any website of ours that links to this privacy notice</li>
                  <li>Engage with us in other related ways, including any sales, marketing, or events</li>
                </ul>
                <h2>Questions or concerns?</h2>
                <p>
                  Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services.
                  If you still have any questions or concerns, please contact us at solution250.contact@gmail.com.</p>
              </div>
              <div className={styles.div_img}>
                <img className={styles.img_security} src="src/assets/security.png" alt="security" />
              </div>
            </div>
            <div className={styles.summary}>
              <h1>SUMMARY OF KEY POINTS</h1>
              <p>This summary provides key points from our privacy notice, but you can find out more details by using our table of contents below to find the section you are looking for.</p>
            </div>
          </div>
          <div className={styles.cardRows}>
            <div className={styles.firstRow}>
              <Card 
              title="Do we process any sensitive personal information?"
              text="We do not process sensitive personal information."/>
              <Card 
              title="What personal information do we process?"
              text="When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn more about personal information you disclose to us."
              />
              <Card
              title="Do we receive any information from third parties? "
              text="We do not receive any information from third parties."
              />
            </div>
            <div className={styles.secondRow}>
            <Card
              title="How do we process your information?"
              text="We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about how we process your information."/>
              <Card
              title="In what situations and with which parties do we share personal information?"
              text="We may share information in specific situations and with specific third parties. Learn more about when and with whom we share your personal information."/>
              <Card
              title="What are your rights?"
              text="Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about your privacy rights."/>
            </div>
            <div className={styles.thirdRow}>
              <Card
              title="How do you exercise your rights? "
              text="
              The easiest way to exercise your rights is by submitting a data subject access request, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws."/>
            </div>
          </div>
        </div>

        <div className={styles.privacy_content}>
        <div className={styles.table_content}>
          <div className={styles.stickyContent}>
            <ul>
              <li><a href="#li1">What Information Do We Collect?</a></li>
              <li><a href="#li2">How Do We Process Your Information?</a></li>
              <li><a href="#li3">When and With Whom Do We Share Your Personal Information?</a></li>
              <li><a href="#li4">Do We Use Cookies and Other Tracking Technologies?</a></li>
              <li><a href="#li5">How Do We Handle Your Social Logins?</a></li>
              <li><a href="#li6">How Long Do We Keep Your Information?</a></li>
              <li><a href="#li7">Do We Collect Information From Minors?</a></li>
              <li><a href="#li8">Controls for Do-Not-Track Features</a></li>
              <li><a href="#li9">How Can You Contact Us About This Notice?</a></li>
              <li><a href="#li10">How Can You Review, Update, or Delete the Data We Collect From You?</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.privacy_details}> 

          <ul className={styles.ul_privacy_details}>
            <li id="li1">
              <h2>What Information Do We Collect?</h2>
              <h3>In Short:</h3>
              <p>We collect personal information that you provide to us.
                We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
              </p>
              <h3>Personal Information Provided by You.</h3>
              <p>The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
              <ul>
                <li>email addresses</li>
                <li>job titles</li>
                <li>contact preferences</li>
                <li>debit/credit card numbers</li>
                <li>billing addresses</li>
                <li>company names</li>
              </ul>
              <h3>Sensitive Information.</h3>
              <p>We do not process sensitive information.</p>
              <h3>Social Media Login Data.</h3>
              <p>We may provide you with the option to register with us using your existing social media account details, like your Facebook, Twitter, or other social media account. If you choose to register in this way, we will collect the information described in the section called "HOW DO WE HANDLE YOUR SOCIAL LOGINS?"below.</p>
              <p>All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.</p>
            </li>
            <li id="li2">
              <h2>How Do We Process Your Information?</h2>
              <h3>In Short:</h3>
              <p>
               We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</p>
              <p>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</p>
              <ul>
                <li>To facilitate account creation and authentication and otherwise manage user accounts. We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
                <li>To deliver and facilitate delivery of services to the user. We may process your information to provide you with the requested service.</li>
                <li>To respond to user inquiries/offer support to users. We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.</li>
                <li>To fulfill and manage your orders. We may process your information to fulfill and manage your orders, payments, returns, and exchanges made through the Services.</li>
                <li>To protect our Services. We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.</li>
                <li>To save or protect an individual's vital interest. We may process your information when necessary to save or protect an individual’s vital interest, such as to prevent harm.</li>
              </ul>

            </li>
            <li id="li3">
              <h2>When and With Whom Do We Share Your Personal Information?</h2>
              <h3>In Short:</h3>
              <p>  We may share information in specific situations described in this section and/or with the following third parties.
                We may need to share your personal information in the following situations:</p>
              <ul>
                <li>Business Transfers. We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
              </ul>
            </li>
            <li id="li4">
              <h2>Do We Use Cookies and Other Tracking Technologies?</h2>
              <h3>In Short:</h3> 
              <p>We may use cookies and other tracking technologies to collect and store your information.</p>
              <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.</p>
            </li>
            <li id="li5">
              <h2>How Do We Handle Your Social Logins?</h2>
              <h3>In Short:</h3> 
              <p>
              If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.</p>
              <p>Our Services offer you the ability to register and log in using your third-party social media account details (like your Facebook or Twitter logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, and profile picture, as well as other information you choose to make public on such a social media platform.</p>
              <p>We will use the information we receive only for the purposes that are described in this privacy notice or that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider. We recommend that you review their privacy notice to understand how they collect, use, and share your personal information, and how you can set your privacy preferences on their sites and apps.</p>              
            </li>
            <li id="li6">
              <h2>How Long Do We Keep Your Information?</h2>
              <h3>In Short: </h3>
              <p>We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.</p>
              <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.</p>
              <p>When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</p>
            </li>
            <li id="li7">
              <h2>Do We Collect Information From Minors?</h2>
              <h3>In Short:</h3>
               <p>We do not knowingly collect data from or market to children under 18 years of age.</p>
               <p>We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at solution250.contact@gmail.com.</p>
            </li>
            <li id="li8">
              <h2>Controls for Do-Not-Track Features</h2>
              <p>Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.</p>
            </li>
            <li id="li9">
              <h2>How Can You Contact Us About This Notice?</h2>
              <p>If you have questions or comments about this notice, you may email us at solution250.contact@gmail.com.</p>
            </li>
            <li id="li10">
              <h2>How Can You Review, Update, or Delete the Data We Collect From You?</h2>
              <p>You have the right to request access to the personal information we collect from you, change that information, or delete it. To request to review, update, or delete your personal information, please fill out and submit a data subject access request.</p>
            </li>

          </ul>
        </div>  
        </div>
      </div>
    );
};






