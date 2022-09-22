import { ScrollView } from "app/design-system/ScrollView";
import { Text } from "app/design-system";
import Navbar from "app/ui/navbar";
import { SafeAreaView } from "app/design-system/safe-area-view";
import { tw } from "app/design-system/tailwind";

export default function PrivacyScreen() {
  return (
    <SafeAreaView
      edges={["bottom"]}
      className="flex flex-1 bg-blue-dark max-h-[100vh]"
    >
      {tw.prefixMatch("web") && <Navbar />}
      <ScrollView className="p-8 flex-1">
        <Text className="title">PRIVACY POLICY</Text>
        <Text className="section-title">
          SECTION 1 - WHAT DO WE DO WITH YOUR INFORMATION?
        </Text>
        <Text className="paragraph">
          When you purchase something from our store, as part of the buying and
          selling process, we collect the personal information you give us such
          as your name, address and email address.
        </Text>
        <Text className="paragraph">
          When you browse our store, we also automatically receive your
          computer’s internet protocol (IP) address in order to provide us with
          information that helps us learn about your browser and operating
          system.
        </Text>
        <Text className="paragraph">
          Email marketing (if applicable): With your permission, we may send you
          emails about our services, new products and other updates.
        </Text>
        <Text className="section-title">SECTION 2 - CONSENT</Text>
        <Text className="paragraph">How do you get my consent?</Text>
        <Text className="paragraph">
          When you provide us with personal information to complete a
          transaction, verify your credit card, place an order, arrange for a
          delivery or return a purchase, we imply that you consent to our
          collecting it and using it for that specific reason only.
        </Text>
        <Text className="paragraph">
          If we ask for your personal information for a secondary reason, like
          marketing, we will either ask you directly for your expressed consent,
          or provide you with an opportunity to say no.
        </Text>
        <Text className="paragraph">How do I withdraw my consent?</Text>
        <Text className="paragraph">
          If after you opt-in, you change your mind, you may withdraw your
          consent for us to contact you, for the continued collection, use or
          disclosure of your information, at anytime, by contacting us at
          alejandro@skyhitzmusic.com or mailing us at: Skyhitz 2nd Floor, Mill
          Mall Tower Wickhams Cay 1 Road Town, Tortola, 1110, Virgin Islands,
          British
        </Text>
        <Text className="section-title">SECTION 3 - DISCLOSURE</Text>
        <Text className="paragraph">
          We may disclose your personal information if we are required by law to
          do so or if you violate our Terms of Service.
        </Text>
        <Text className="section-title">SECTION 4 - STRIPE</Text>
        <Text className="paragraph">
          Our payments are powered by Stripe Inc. They provide us with the
          platform that allows us to sell our services to you.
        </Text>
        <Text className="paragraph">
          Your data is stored through Stripe’s data storage, databases and the
          general Stripe application. They store your data on a secure server
          behind a firewall.
        </Text>
        <Text className="paragraph">Payment:</Text>
        <Text className="paragraph">
          If you choose a direct payment gateway to complete your purchase, then
          Stripe stores your credit card data. It is encrypted through the
          Payment Card Industry Data Security Standard (PCI-DSS). Your purchase
          transaction data is stored only as long as is necessary to complete
          your purchase transaction. After that is complete, your purchase
          transaction information is deleted.
        </Text>
        <Text className="paragraph">
          All direct payment gateways adhere to the standards set by PCI-DSS as
          managed by the PCI Security Standards Council, which is a joint effort
          of brands like Visa, MasterCard, American Express and Discover.
        </Text>
        <Text className="paragraph">
          PCI-DSS requirements help ensure the secure handling of credit card
          information by our store and its service providers.
        </Text>
        <Text className="paragraph">
          For more insight, you may also want to read Stripe’s Terms of Service
          or Privacy Statement.
        </Text>
        <Text className="section-title">SECTION 5 - THIRD-PARTY SERVICES</Text>
        <Text className="paragraph">
          In general, the third-party providers used by us will only collect,
          use and disclose your information to the extent necessary to allow
          them to perform the services they provide to us.
        </Text>
        <Text className="paragraph">
          However, certain third-party service providers, such as payment
          gateways and other payment transaction processors, have their own
          privacy policies in respect to the information we are required to
          provide to them for your purchase-related transactions.
        </Text>
        <Text className="paragraph">
          For these providers, we recommend that you read their privacy policies
          so you can understand the manner in which your personal information
          will be handled by these providers.
        </Text>
        <Text className="paragraph">
          In particular, remember that certain providers may be located in or
          have facilities that are located in a different jurisdiction than
          either you or us. So if you elect to proceed with a transaction that
          involves the services of a third-party service provider, then your
          information may become subject to the laws of the jurisdiction(s) in
          which that service provider or its facilities are located.
        </Text>
        <Text className="paragraph">
          As an example, if you are located in Canada and your transaction is
          processed by a payment gateway located in the United States, then your
          personal information used in completing that transaction may be
          subject to disclosure under United States legislation, including the
          Patriot Act.
        </Text>
        <Text className="paragraph">
          Once you leave our store’s website or are redirected to a third-party
          website or application, you are no longer governed by this Privacy
          Policy or our website’s Terms of Service. Links When you click on
          links on our store, they may direct you away from our site. We are not
          responsible for the privacy practices of other sites and encourage you
          to read their privacy statements.
        </Text>
        <Text className="section-title">SECTION 6 - SECURITY</Text>
        <Text className="paragraph">
          To protect your personal information, we take reasonable precautions
          and follow industry best practices to make sure it is not
          inappropriately lost, misused, accessed, disclosed, altered or
          destroyed.
        </Text>
        <Text className="paragraph">
          If you provide us with your credit card information, the information
          is encrypted using secure socket layer technology (SSL) and stored
          with a AES-256 encryption. Although no method of transmission over the
          Internet or electronic storage is 100% secure, we follow all PCI-DSS
          requirements and implement additional generally accepted industry
          standards.
        </Text>
        <Text className="section-title">SECTION 6 - COOKIES</Text>
        <Text className="paragraph">
          We use various technologies to collect and store information when you
          visit our services, and this may include using cookies or similar
          technologies to identify your browser or device. We also use these
          technologies to collect and store information when you interact with
          services we offer to our partners, such as advertising services. We
          use google analytics which helps businesses and site owners analyze
          the traffic to their websites and apps.
        </Text>
        <Text className="section-title">SECTION 7 - AGE OF CONSENT</Text>
        <Text className="paragraph">
          By using this site or any of our apps, you represent that you are at
          least the age of majority in your state or province of residence, or
          that you are the age of majority in your state or province of
          residence and you have given us your consent to allow any of your
          minor dependents to use this site.
        </Text>
        <Text className="section-title">
          SECTION 8 - CHANGES TO THIS PRIVACY POLICY
        </Text>
        <Text className="paragraph">
          We reserve the right to modify this privacy policy at any time, so
          please review it frequently. Changes and clarifications will take
          effect immediately upon their posting on the website. If we make
          material changes to this policy, we will notify you here that it has
          been updated, so that you are aware of what information we collect,
          how we use it, and under what circumstances, if any, we use and/or
          disclose it.
        </Text>
        <Text className="paragraph">
          If our apps are acquired or merged with another company, your
          information may be transferred to the new owners so that we may
          continue to sell services to you.
        </Text>
        <Text className="section-title">QUESTIONS AND CONTACT INFORMATION</Text>
        <Text className="paragraph">
          If you would like to: access, correct, amend or delete any personal
          information we have about you, register a complaint, or simply want
          more information contact our Privacy Compliance Officer at
          alejandro@skyhitzmusic.com.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
