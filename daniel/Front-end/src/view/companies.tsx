import React, { useState, useEffect } from "react";
import axios from "axios";
import ArrowButton from "./components/ArrowButton";
import CompaniesGenerator from "./components/generateCompanies";

export interface Company {
  companyId: number;
  name: string;
  address: string;
  totalEmployees: number;
}

const Companies: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchedName, setSearchedName] = useState<string>("");
  const [sortByName, setSortByName] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const companiesPerPage = 20;

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get<{ result: Company[] }>(
          "http://localhost:3000/companies"
        );
        if (Array.isArray(response.data.result)) {
          setCompanies(response.data.result);
        } else {
          throw new Error("Data is not an array");
        }
      } catch (error) {
        setError("Error showing companies");
      }
    };

    fetchCompanies();
  }, []);

  const handleSortByName = (): void => {
    setSortByName((prevSortByName) => !prevSortByName);
  };

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchedName.toLowerCase())
  );

  const sortedCompanies = sortByName
    ? [...filteredCompanies].sort((a, b) => a.name.localeCompare(b.name))
    : filteredCompanies;

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = sortedCompanies.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );

  const totalPages = Math.ceil(sortedCompanies.length / companiesPerPage);

  return (
    <div>
      <ArrowButton />
      {error && <p>{error}</p>}
      <img
        src="https://icons.veryicon.com/png/128/business/basic-icon-office/company-7.png"
        alt="companies"
      />
      <h2>Companies List</h2>
      <CompaniesGenerator />
      <input
        type="text"
        placeholder="🔍Search"
        value={searchedName}
        onChange={(e) => setSearchedName(e.target.value)}
        required
      />
      <div>
        <button onClick={handleSortByName}>
          {sortByName ? "Unsort by Name" : "Sort by Name"}
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Company Address</th>
            <th>Total Employees</th>
          </tr>
        </thead>
        <tbody>
          {currentCompanies.map((company) => (
            <tr key={company.companyId}>
              <td>{company.companyId}</td>
              <td>{company.name}</td>
              <td>{company.address}</td>
              <td>{company.totalEmployees}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Companies;
