import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Terms and Conditions
        </h1>
        <div className="flex justify-center items-center">
          <span>Terms</span>
        </div>
        <p className="text-gray-600 leading-7">
          Every technician is required to report their earnings from each job to
          the company accurately. Failure to do so, or providing falsified
          information, will result in the company having the right to deduct the
          technician's deposit.
        </p>
        <p className="text-gray-600 leading-7">
          The Company/MasterFix will only earn 9% of Technician's earnings when
          he/she works. For example, if you earn 200 birr, 18 birr will belong
          to the company.
        </p>
        <p className="text-gray-600 leading-7">
          A professional is required to make himself offline if he is not ready
          for work
        </p>
        <p>
          In order to use the MasterFix Service and access any Content, you need
          to be 18 years or older and have the power to enter a binding contract
          with us and not be barred from doing so under any applicable laws,
          agreed to submit to FDRE federal legal system , Obliged that any
          registration information that you submit to MasterFix is true,
          accurate, and complete, and you agree to keep it that way at all
          times. You are solely responsible for any falsehood, inaccuracy and
          incomplete information you provide. Your failure to maintain accurate,
          complete, and up-to-date Account information, including having an
          invalid or expired Identification Card , may result in your inability
          to access and use the Services or MasterFix’s termination of these
          Terms with you. In order to use most aspects of the Services on the
          MasterFix app, you must register for and maintain an active personal
          user Services account (“Account”). Account registration requires you
          to submit to MasterFix certain personal information, such as your
          name, address, mobile phone number , Clear and visible Profile image ,
          Front and Back side of your Identification Card and age. The
          Identification Card can be Kebele id or National id or PassPort. You
          are responsible for all activity that occurs under your Account, and
          you agree to maintain the security and secrecy of your Account
          username and password at all times.
        </p>
        <br />
        <div>
          <p>አንድ ባለሙያ ስራ ሰርቶ የተከፈለውን የገንዘብ መጠን ሳይጨምር ሳይቀንስ የማሳወቅ ግዴታ አለበት</p>
          <p>አንድ ባለሙያ ለስራ ዝግጁ ካልሆነ ራሱን Offline የማድረግ ግዴታ አለበት</p>
          <p>
            አንድ ባለሙያ ስራ ሲሰራ ብቻ ከሰራበት ላይ 9% ወደ ድርጅቱ ገቢ ይሆናል። ለምሳሌ 200 ብር ብትሰሩ 18
            ብሩ የድርጅቱ ይሆናል ማለት ነው።
          </p>
          <p>
            የMasterFix አገልግሎትን ለመጠቀም 18 ዓመት ወይም ከዚያ በላይ መሆን ያስፈልግዎታል። ወደ
            MasterFix የሚያስገቡት ማንኛውም የምዝገባ መረጃ እውነት፣ ትክክለኛ እና የተሟላ መሆኑን እና በማንኛውም
            ጊዜ እንደዛ ለማቆየት ተስማምተሃል። ለሚያቀርቡት ማንኛውም ውሸት፣ የተሳሳተ እና ያልተሟላ መረጃ እርስዎ ብቻ
            ተጠያቂ ነዎት። ትክክለኛ፣ የተሟላ እና ወቅታዊ የመለያ መረጃን አለማቆየትዎ ልክ ያልሆነ ወይም ጊዜው
            ያለፈበት የመታወቂያ ካርድ መያዝን ጨምሮ አገልግሎቶቹን ማግኘት እና መጠቀም አለመቻልዎ ወይም MasterFix
            እነዚህን ውሎች ከእርስዎ ጋር ሊያቋርጥ ይችላል። በ MasterFix መተግበሪያ ላይ ያሉትን አብዛኛዎቹን
            የአገልግሎቶቹን ገፅታዎች ለመጠቀም ንቁ የሆነ የግል ተጠቃሚ አገልግሎቶች መለያ ("መለያ") መመዝገብ እና
            ማቆየት አለብዎት። የመለያ ምዝገባ እንደ የእርስዎ ስም ፣ አድራሻ ፣ የሞባይል ስልክ ቁጥር ፣ ግልጽ እና
            የሚታየው የመገለጫ ምስል ፣ የመታወቂያ ካርድዎ የፊት እና የኋላ ጎን እና ዕድሜ ያሉ የተወሰኑ የግል
            መረጃዎችን ለ MasterFix እንዲያስገቡ ይፈልጋል። የመታወቂያ ካርዱ የቀበሌ መታወቂያ ወይም ብሄራዊ
            መታወቂያ ወይም ፓስፖርት ሊሆን ይችላል። በመለያዎ ስር ለሚፈጠሩት እንቅስቃሴዎች ሁሉ ኃላፊነቱን ይወስዳሉ፣
            እና የመለያዎን የተጠቃሚ ስም እና የይለፍ ቃል ደህንነት እና ምስጢራዊነት በማንኛውም ጊዜ ለመጠበቅ
            ተስማምተዋል።
          </p>
        </div>
        <div className="mt-6 text-center">
          <a href="/signup" className="text-blue-500 hover:underline text-sm">
            Back to Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
