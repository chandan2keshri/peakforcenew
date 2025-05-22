import { useEffect, useState } from "react";
import ContactUsPopup from "../ContactUsPopup";

const PaymentPlans = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const handleClosePopup = () => {
    setShowContactForm(false);
  };
  const [paymentPlans, setPaymentPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  // Helper function to format amount in lakh or crore
  const formatAmount = (amount) => {
    // Remove currency symbol and commas for parsing
    const cleanedAmount = amount.replace("₹", "").replace(/,/g, "").trim();
    const value = parseFloat(cleanedAmount);

    if (value >= 10000000) {
      // 1 crore = 10,000,000
      return `₹ ${Math.round(value / 10000000)} Cr`;
    } else if (value >= 100000) {
      // 1 lakh = 100,000
      return `₹ ${Math.round(value / 100000)} Lakh`;
    }
    return `₹ ${value}`;
  };

  useEffect(() => {
    // Get project ID from URL (last segment)
    const projectId = window.location.pathname.split("/").pop();

    const fetchData = async () => {
      try {
        const response = await fetch("/data/floorAndPaymentPlans.json");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const allPaymentPlans = [];

        // Search through all companies and their projects
        Object.keys(data).forEach((company) => {
          const projects = data[company];
          projects.forEach((project) => {
            if (project.id === projectId) {
              // Process each floor in the matched project
              project.floors.forEach((floor) => {
                allPaymentPlans.push({
                  // 'Project Name': project.name,
                  "Unit Type": floor.configuration,
                  "Size (SQ. FT.)": floor.area.replace(" sqft", ""),
                  "Price (SQ. FT.)": floor.pricePerSqft,
                  Amount: floor.totalAmount,
                  "Booking Amount": floor.bookingAmount,
                });
              });
            }
          });
        });

        if (allPaymentPlans.length > 0) {
          // Format the amount fields
          const formattedPaymentPlans = allPaymentPlans.map((plan) => ({
            ...plan,
            Amount: formatAmount(plan["Amount"]),
            "Booking Amount": formatAmount(plan["Booking Amount"]),
          }));

          setPaymentPlans(formattedPaymentPlans);
        } else {
          setNotFound(true);
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to load payment plans");
        setLoading(false);
        console.error("Error fetching payment plans:", err);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading payment plans...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (notFound) {
    return (
      <div className="flex items-center justify-center h-50">
        <div className="text-center bg-gray-200 p-6 rounded-2xl shadow-lg">
          <p className="text-gray-600 text-lg">
            No payment plans found for this project.
          </p>
          <button
            onClick={() => setShowContactForm(true)}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Contact Us for Payment Plan
          </button>

          {showContactForm && (
            <div className="mt-12">
              <ContactUsPopup onClose={handleClosePopup} />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-0">
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project Name
              </th> */}
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unit Type
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size (SQ. FT.)
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price (SQ. FT.)
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booking Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paymentPlans.map((plan, index) => (
              <tr key={index}>
                {/* <td className="py-4 px-4 whitespace-nowrap">{plan['Project Name']}</td> */}
                <td className="py-4 px-4 whitespace-nowrap">
                  {plan["Unit Type"]}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  {plan["Size (SQ. FT.)"]}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  {plan["Price (SQ. FT.)"]}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  {plan["Amount"]}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  {plan["Booking Amount"]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentPlans;
