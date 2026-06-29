/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { Database, Table, FileJson, Link2, RefreshCw, ZoomIn } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

interface SchemaPlaygroundProps {
  isDark: boolean;
}

export default function SchemaPlayground({ isDark }: SchemaPlaygroundProps) {
  const [activeSchema, setActiveSchema] = useState<'mysql' | 'mongodb'>('mysql');
  const [selectedTable, setSelectedTable] = useState<string>('products');
  const [selectedCollection, setSelectedCollection] = useState<string>('users');
  const [simulatedQueryResult, setSimulatedQueryResult] = useState<string>('Click a query button below or change tables to execute JOIN...');

  // MySQL Schema definitions
  const mysqlTables: Record<string, { cols: { name: string; type: string; key?: string }[]; joinInfo: string; code: string }> = {
    users: {
      cols: [
        { name: 'user_id', type: 'INT (PK)', key: 'PK' },
        { name: 'name', type: 'VARCHAR(100)' },
        { name: 'email', type: 'VARCHAR(150) (UNIQUE)' },
        { name: 'register_date', type: 'TIMESTAMP' }
      ],
      joinInfo: 'Links to Orders table via orders.user_id = users.user_id (1:N relationship)',
      code: 'SELECT u.name, u.email, o.order_date, o.total_amount \nFROM users u \nINNER JOIN orders o ON u.user_id = o.user_id;'
    },
    products: {
      cols: [
        { name: 'product_id', type: 'INT (PK)', key: 'PK' },
        { name: 'name', type: 'VARCHAR(200)' },
        { name: 'price', type: 'DECIMAL(10,2)' },
        { name: 'stock', type: 'INT' },
        { name: 'category_id', type: 'INT (FK)', key: 'FK' }
      ],
      joinInfo: 'Links to Categories table via products.category_id = categories.category_id',
      code: 'SELECT p.name, p.price, c.category_name \nFROM products p \nINNER JOIN categories c ON p.category_id = c.category_id \nWHERE p.stock < 10;'
    },
    orders: {
      cols: [
        { name: 'order_id', type: 'INT (PK)', key: 'PK' },
        { name: 'user_id', type: 'INT (FK)', key: 'FK' },
        { name: 'order_date', type: 'DATE' },
        { name: 'total_amount', type: 'DECIMAL(10,2)' }
      ],
      joinInfo: 'Connects users and payments (PK: order_id; FK components: user_id)',
      code: 'SELECT o.order_id, u.name, SUM(o.total_amount) as total_spent \nFROM orders o \nJOIN users u ON o.user_id = u.user_id \nGROUP BY u.user_id \nHAVING total_spent > 500;'
    },
    reviews: {
      cols: [
        { name: 'review_id', type: 'INT (PK)', key: 'PK' },
        { name: 'product_id', type: 'INT (FK)', key: 'FK' },
        { name: 'user_id', type: 'INT (FK)', key: 'FK' },
        { name: 'rating', type: 'TINYINT' },
        { name: 'comment', type: 'TEXT' }
      ],
      joinInfo: 'Links users (users.user_id) to the inventory item reviewed (products.product_id).',
      code: 'SELECT p.name as product_name, AVG(r.rating) as average_rate, COUNT(r.review_id) as total_reviews \nFROM reviews r \nRIGHT JOIN products p ON r.product_id = p.product_id \nGROUP BY p.product_id;'
    }
  };

  // MongoDB Collection BSON mock records
  const mongoCollections: Record<string, { desc: string; bson: string }> = {
    users: {
      desc: 'Users collection store with integrated profiles and embedded task submission references.',
      bson: JSON.stringify({
        _id: 'ObjectId("65b2d8e411210001a1829e01")',
        name: 'Kamal Harris',
        email: 'kamal@kpr.edu',
        status: 'Active',
        courses_enrolled: ['React-Vite-Bootcamp'],
        attendance_percentage: 85.5
      }, null, 2)
    },
    mentors: {
      desc: 'Mentoring catalog holding active courses assigned, skills, and current student capacity metrics.',
      bson: JSON.stringify({
        _id: 'ObjectId("65b2e9c155d90123f2a89004")',
        mentor_name: 'Dr. Ashok Kumar',
        expertise: ['JavaScript', 'System Integration', 'SQL Schema design'],
        courses_assigned: ['MERN-Stack-Advanced', 'Relational-Databases-101'],
        mentees_count: 14
      }, null, 2)
    },
    tasks: {
      desc: 'A collection modeling coursework, submission links, grades, evaluation comments and deadlines.',
      bson: JSON.stringify({
        _id: 'ObjectId("65b2fa8bc8819d00c3b88950")',
        task_name: 'Deploy Movie Search Front-end applet',
        assigned_date: 'ISO("2026-03-20T00:00:00Z")',
        status: 'Graded',
        score: 9.8,
        eval_comments: 'Excellent input debouncing and React Hook structure.'
      }, null, 2)
    },
    placements: {
      desc: 'Placement history records listing client companies, packages, and statuses.',
      bson: JSON.stringify({
        _id: 'ObjectId("65b30ffaccd19987dc989803")',
        student_id: 'ObjectId("65b2d8e411210001a1829e01")',
        company_name: 'Bluestock Fintech',
        role: 'Software Engineering Intern',
        package_offered: '8.4 LPA',
        status: 'Offered'
      }, null, 2)
    }
  };

  const executeSimulatedQuery = (codeStr: string) => {
    setSimulatedQueryResult('Executing query against indexed tables...');
    setTimeout(() => {
      if (selectedTable === 'products') {
        setSimulatedQueryResult(
          'Query Results:\n' +
          '------------------------------------------------------------------------\n' +
          '| product_name           | price     | category_name   | stock (Low)   |\n' +
          '|------------------------|-----------|-----------------|--------------|\n' +
          '| Ergodynamic mechanical | 849.00    | Accessories     | 3            |\n' +
          '| DevHub mechanical key  | 149.00    | Keyboards       | 8            |\n' +
          '------------------------------------------------------------------------\n' +
          '2 rows returned. Execution speed: 0.12ms (optimized index utilized).'
        );
      } else if (selectedTable === 'users') {
        setSimulatedQueryResult(
          'Query Results:\n' +
          '------------------------------------------------------------------------\n' +
          '| user_name      | user_email              | order_date   | total_spend|\n' +
          '|----------------|-------------------------|--------------|------------|\n' +
          '| Tamoharini R   | tamoharini2005@gmail... | 2026-03-14   | $580.00    |\n' +
          '| John Doe       | john.doe@gmail.com      | 2026-03-22   | $410.00    |\n' +
          '------------------------------------------------------------------------\n' +
          '2 rows returned. Relationship cardinality mapped.'
        );
      } else {
        setSimulatedQueryResult(
          'Query Results Completed Successfully.\nReturned mock indices matching table: ' +
          selectedTable.toUpperCase() +
          '\nRows affected: ~45 rows | CPU execution cycle: ~0.02ms'
        );
      }
    }, 400);
  };

  return (
    <section
      id="playground"
      className={`py-20 border-b ${
        isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-850'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Interactive Database Sandbox
          </h2>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
          <p className={`mt-4 text-sm sm:text-base ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
            Explore raw schema architecture designs representing structural schemas in MySQL and NoSQL models.
          </p>
        </div>

        {/* Database selector tabs */}
        <div className="flex justify-center mb-8">
          <div className={`p-1.5 rounded-2xl flex space-x-2 border ${
            isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-100 border-zinc-200'
          }`}>
            <button
               id="sandbox-mysql-tab-btn"
              onClick={() => {
                setActiveSchema('mysql');
                setSimulatedQueryResult('Click on a query button below or change tables to execute JOIN...');
              }}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all outline-none ${
                activeSchema === 'mysql'
                  ? isDark
                    ? 'bg-zinc-800 text-emerald-400 border border-zinc-700 shadow-xs'
                    : 'bg-white text-emerald-600 border border-emerald-500 shadow-xs font-bold ring-2 ring-emerald-500/10'
                  : isDark
                    ? 'text-zinc-500 hover:text-zinc-300'
                    : 'text-zinc-550 hover:text-zinc-800'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>ShopDB (MySQL Relational 3NF)</span>
            </button>
            <button
              id="sandbox-mongodb-tab-btn"
              onClick={() => setActiveSchema('mongodb')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all outline-none ${
                activeSchema === 'mongodb'
                  ? isDark
                    ? 'bg-zinc-800 text-emerald-400 border border-zinc-700 shadow-xs'
                    : 'bg-white text-emerald-604 border border-emerald-500 shadow-xs font-bold ring-2 ring-emerald-500/10'
                  : isDark
                    ? 'text-zinc-500 hover:text-zinc-300'
                    : 'text-zinc-550 hover:text-zinc-800'
              }`}
            >
              <FileJson className="w-4 h-4" />
              <span>Zen Class (MongoDB Document Map)</span>
            </button>
          </div>
        </div>

        {/* Console layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Console Panel (Sidebar, Table details) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            {activeSchema === 'mysql' ? (
              <div className={`p-6 rounded-2xl border flex-1 flex flex-col justify-between ${
                isDark ? 'bg-zinc-850 border-zinc-800' : 'bg-zinc-50 border-zinc-150'
              }`}>
                <div>
                  <div className="flex items-center space-x-2.5 mb-4">
                    <Table className="w-5 h-5 text-emerald-500" />
                    <h3 className="font-bold text-sm uppercase tracking-tight font-mono">
                      ShopDB Schema Tables (8+ Normalised Nodes)
                    </h3>
                  </div>

                  {/* Table Selection Pills */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {Object.keys(mysqlTables).map((tbl) => (
                      <button
                        key={tbl}
                        id={`sandbox-tbl-pill-${tbl}`}
                        onClick={() => {
                          setSelectedTable(tbl);
                          setSimulatedQueryResult('Click on execute below to trace join outputs for ' + tbl.toUpperCase());
                        }}
                        className={`text-xs px-3.5 py-1.5 rounded-lg border uppercase font-mono tracking-tight font-bold transition-all ${
                          selectedTable === tbl
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : isDark
                              ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                              : 'bg-white border-zinc-205 text-zinc-600 hover:bg-zinc-100'
                        }`}
                      >
                        {tbl}
                      </button>
                    ))}
                  </div>

                  {/* Attributes metadata list */}
                  <div className="space-y-2 mb-5">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      Table Fields & Types Structure:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {mysqlTables[selectedTable].cols.map((col, cIdx) => (
                        <div
                          key={cIdx}
                          className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                            isDark ? 'bg-zinc-900/60 border-zinc-805' : 'bg-white border-zinc-200'
                          }`}
                        >
                          <span className={`font-mono font-bold ${
                            col.key === 'PK' ? 'text-emerald-500 font-extrabold' : col.key === 'FK' ? 'text-blue-500' : ''
                          }`}>
                            {col.name}
                          </span>
                          <span className={`text-[10px] text-zinc-500 font-mono`}>{col.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Primary Join relationship alert */}
                <div className={`p-3.5 rounded-xl border flex items-start space-x-2 text-xs ${
                  isDark ? 'bg-zinc-900 text-zinc-300 border-zinc-800' : 'bg-white text-zinc-650 border-zinc-200 shadow-2xs'
                }`}>
                  <Link2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p className="leading-normal">
                    <strong>Relation Binding:</strong> {mysqlTables[selectedTable].joinInfo}
                  </p>
                </div>
              </div>
            ) : (
              <div className={`p-6 rounded-2xl border flex-1 flex flex-col justify-between ${
                isDark ? 'bg-zinc-850 border-zinc-800' : 'bg-zinc-50 border-zinc-150'
              }`}>
                <div>
                  <div className="flex items-center space-x-2.5 mb-4">
                    <FileJson className="w-5 h-5 text-emerald-500" />
                    <h3 className="font-bold text-sm uppercase tracking-tight font-mono">
                      Zen Class NoSQL Collections (7-Collection DB Model)
                    </h3>
                  </div>

                  {/* Collection selection */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Object.keys(mongoCollections).map((col) => (
                      <button
                        key={col}
                        id={`sandbox-col-pill-${col}`}
                        onClick={() => setSelectedCollection(col)}
                        className={`text-xs px-3.5 py-1.5 rounded-lg border uppercase font-mono tracking-tight font-bold transition-all ${
                          selectedCollection === col
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : isDark
                              ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                              : 'bg-white border-zinc-205 text-zinc-600 hover:bg-zinc-100'
                        }`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>

                  <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {mongoCollections[selectedCollection].desc}
                  </p>
                </div>

                <div className={`p-4 rounded-xl border border-emerald-500/10 text-xs text-emerald-500 ${isDark ? 'bg-zinc-900/40' : 'bg-emerald-500/5'}`}>
                  <strong>MongoDB Aggregate Connection:</strong> Designed document references modeling students, mentors, activities, and assignments for complete ed-tech platform flow.
                </div>
              </div>
            )}
          </div>

          {/* Right Console Panel (Execution View) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className={`p-6 rounded-2xl border flex-1 flex flex-col justify-between ${
              isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-3 border-b pb-2.5 border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span className="text-[10px] font-mono uppercase tracking-tight font-bold text-zinc-400">
                      {activeSchema === 'mysql' ? 'SQL Query Executor' : 'BSON Schema Document'}
                    </span>
                  </div>
                  {activeSchema === 'mysql' && (
                    <button
                      id="sandbox-execute-query-btn"
                      onClick={() => executeSimulatedQuery(mysqlTables[selectedTable].code)}
                      className="flex items-center space-x-1.5 px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-550 text-white font-bold font-mono text-[10px] uppercase shadow-xs transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3 block" />
                      <span>Execute SELECT Query</span>
                    </button>
                  )}
                </div>

                {activeSchema === 'mysql' ? (
                  <div className="space-y-4">
                    {/* Raw sql statement viewer */}
                    <div className="space-y-1">
                      <span className="text-[10px] text-zinc-500 font-mono uppercase block">Target Optimized Statement:</span>
                      <pre className={`p-3.5 rounded-xl border overflow-x-auto text-[11px] font-mono ${
                        isDark ? 'bg-zinc-900 border-zinc-800 text-emerald-400' : 'bg-zinc-50 border-zinc-200 text-zinc-850'
                      }`}>
                        {mysqlTables[selectedTable].code}
                      </pre>
                    </div>

                    {/* Result log block */}
                    <div className="space-y-1">
                      <span className="text-[10px] text-zinc-500 font-mono uppercase block">Local Output Buffer:</span>
                      <pre className={`p-4 rounded-xl border font-mono text-[11px] leading-relaxed overflow-x-auto block h-[180px] ${
                        isDark ? 'bg-zinc-900/60 border-zinc-850 text-zinc-300' : 'bg-zinc-50/70 border-zinc-200 text-zinc-750'
                      }`}>
                        {simulatedQueryResult}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] text-zinc-500 font-mono uppercase block">Collection Structured Node (BSON/JSON Format):</span>
                    <pre className={`p-4 rounded-xl border font-mono text-[11px] leading-relaxed overflow-x-auto h-[300px] ${
                      isDark ? 'bg-zinc-900 border-zinc-800 text-green-400' : 'bg-zinc-50 border-zinc-200 text-green-700'
                    }`}>
                      {mongoCollections[selectedCollection].bson}
                    </pre>
                  </div>
                )}
              </div>

              {/* Console summary metrics */}
              <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span className="flex items-center space-x-1">
                  <ZoomIn className="w-3 h-3 text-emerald-500" />
                  <span>Double-indexed schema optimized (3NF relational structures & NoSQL records)</span>
                </span>
                <span>v1.0.4 stable</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
