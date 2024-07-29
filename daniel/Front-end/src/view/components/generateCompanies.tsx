import React, { useState } from "react";
import axios from "axios";

interface Company {
  id: number;
  name: string;
  address: string;
  totalEmployees: number;
}

const companyNames: string[] = [
  "TechCorp",
  "Innovate Solutions",
  "Future Ventures",
  "EnterpriseX",
  "GlobalTech",
  "WebWorks",
  "CodeCrafters",
  "NextGen Solutions",
  "InfiniTech",
  "Data Dynamics",
  "ByteBuilders",
  "NetNovations",
  "PrimeTech",
  "Alpha Innovations",
];

const addresses: string[] = [
  "123 Main St, City A",
  "456 Oak St, City B",
  "789 Pine St, City C",
  "101 Maple St, City D",
  "202 Elm St, City E",
  "303 Cedar St, City F",
  "404 Spruce St, City G",
  "505 Birch St, City H",
  "606 Walnut St, City I",
  "707 Chestnut St, City J",
  "808 Willow St, City K",
  "909 Ash St, City L",
  "1010 Poplar St, City M",
  "1111 Redwood St, City N",
];

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const GenerateRandomCompanies = (count: number): Company[] => {
  const companies: Company[] = [];
  const usedNames = new Set<string>();

  for (let i = 0; i < count; i++) {
    let name = companyNames[getRandomInt(0, companyNames.length - 1)];
    while (usedNames.has(name)) {
      name = companyNames[getRandomInt(0, companyNames.length - 1)];
    }
    usedNames.add(name);

    const address = addresses[getRandomInt(0, addresses.length - 1)];
    const totalEmployees = 0;

    const company: Company = {
      id: i + 1,
      name,
      address,
      totalEmployees,
    };

    companies.push(company);
  }

  return companies;
};

const CompaniesGenerator: React.FC = () => {
  const [numberOfCompanies, setNumberOfCompanies] = useState<number>();
  const [error, setError] = useState<string | null>(null);

  const handleGenerateCompanies = async () => {

    const companies = numberOfCompanies ? GenerateRandomCompanies(numberOfCompanies) : [];
    try {
      await axios.post("http://localhost:3000/CompaniesGenerator", companies);
      alert(numberOfCompanies + " Companies created successfully!");
      window.location.reload();
    } catch (error) {
      setError("Error sending companies to backend");
    }
  };

  return (
    <div>
      <label>
        <input
          placeholder="Number of Companies"
          type="number"
          value={numberOfCompanies}
          onChange={(e) => setNumberOfCompanies(parseInt(e.target.value) || 0)}
        />
      </label>
      <button onClick={handleGenerateCompanies}>Generate {numberOfCompanies} Companies</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CompaniesGenerator;

