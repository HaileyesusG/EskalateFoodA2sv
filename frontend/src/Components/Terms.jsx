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
        <br />
        <div>
          <p>አንድ ባለሙያ ስራ ሰርቶ የተከፈለውን የገንዘብ መጠን ሳይጨምር ሳይቀንስ የማሳወቅ ግዴታ አለበት</p>
          <p>አንድ ባለሙያ ለስራ ዝግጁ ካልሆነ ራሱን Offline የማድረግ ግዴታ አለበት</p>
          <p>
            አንድ ባለሙያ ስራ ሲሰራ ብቻ ከሰራበት ላይ 9% ወደ ድርጅቱ ገቢ ይሆናል። ለምሳሌ 200 ብር ብትሰሩ 18
            ብሩ የድርጅቱ ይሆናል ማለት ነው።
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
