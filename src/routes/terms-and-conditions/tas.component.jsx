import React from 'react'
import { ReactComponent as LibLogo } from "../../assets/img/lib-logo.svg";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    
    <>
        <div className= "w-full h-full bg-gradient-to-b from-[#0a433d] via-[#0a433d63] to-[#C21717] py-16 px-4 text-gray-800 font-sans">
            <Link to="/" className="ml-[4rem] flex items-center fixed space-x-3 rtl:space-x-reverse bg-white/30 backdrop-blur-md border border-white/20 rounded-3xl py-1 px-4">
                <LibLogo className="h-11 w-11" alt="UCBS Library Management System Logo"/>
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">UCBS Library</span>
            </Link>
            <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-lg rounded-2xl">             
                <h1 className="text-3xl font-bold text-center mb-6 text-[#C21717]">Terms and Conditions</h1>
                <p className="text-sm text-center text-gray-500 mb-8">Last updated: <span className="font-medium">4 April 2025</span></p>

                <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-semibold text-[#21736b]">1. Acceptance of Terms</h2>
                    <p>By using the E-Library system, you acknowledge that you have read, understood, and agreed to these Terms and Conditions, along with applicable college policies.</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-[#21736b]">2. Eligibility</h2>
                    <p>This platform is intended for authorized students, faculty, and staff of University College of Business Studies. Unauthorized access is strictly prohibited.</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-[#21736b]">3. Use of the System</h2>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Use only valid college-issued credentials to log in.</li>
                    <li>Use the system for academic and library purposes only.</li>
                    <li>Misuse such as tampering or spreading false info is prohibited.</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-[#21736b]">4. User Responsibilities</h2>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Keep login credentials confidential.</li>
                    <li>Return or renew books on time to avoid penalties.</li>
                    <li>Report issues to library staff or admins.</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-[#21736b]">5. Borrowing Rules</h2>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Loan limits may vary by user role.</li>
                    <li>Overdue items may result in fines or borrowing restrictions.</li>
                    <li>Lost/damaged items must be compensated for.</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-[#21736b]">6. Data Privacy</h2>
                    <p>We respect your privacy. Activity logs are for maintenance and security. Personal information is handled under University College of Business Studies privacy policy.</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-[#21736b]">7. System Availability</h2>
                    <p>The system may be temporarily unavailable for maintenance. We are not responsible for any inconvenience caused by downtime.</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-[#21736b]">8. Intellectual Property</h2>
                    <p>The E-Library software is a project developed for educational purposes and remains the intellectual property of <a href='https://digitcrib.com/' target='_blank' rel='noreferrer'>DigitCrib™</a> & University College of Business Studies, as applicable. All trademarks, service marks, and logos are the property of their respective owners.</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-[#21736b]">9. Changes to Terms</h2>
                    <p>We may update these terms occasionally. Continued use of the system means you accept the updates.</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-[#21736b]">10. Contact Information</h2>
                    <p>For support, contact:</p>
                    <ul className="list-none ml-4">
                    <li className='py-2'>✉️ <strong>Email:</strong> hpu.ucbs@gmail.com</li>
                    <li>📍 <strong>Office:</strong> Library, University College of Business Studies</li>
                    </ul>
                </div>
                </div>
            </div>
        </div>
    </>

  )
}

export default TermsAndConditions;