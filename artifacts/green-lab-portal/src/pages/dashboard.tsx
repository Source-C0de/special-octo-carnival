import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, Activity, AlertTriangle, CheckCircle2, Clock, 
  Download, Filter, ChevronRight, PieChart, FlaskConical 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { gapAnalysisData, analyticalTrends } from "@/lib/mock-data";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const complianceScore = 82;

  const handleDownload = (docId: string) => {
    toast({
      title: "Downloading Document",
      description: `Preparing ${docId} for download...`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary/20">
      {/* DASHBOARD HEADER */}
      <div className="bg-background border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold tracking-tight">Compliance Engine</h1>
            <p className="text-sm text-muted-foreground">Welcome back, Saudi BioTech LLC</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" /> Export Summary
            </Button>
            <Button size="sm">Submit New Sample</Button>
          </div>
        </div>
        
        {/* Sub-nav */}
        <div className="container mx-auto px-4 flex gap-6 text-sm font-medium overflow-x-auto hide-scrollbar">
          {[
            { id: "overview", label: "Overview" },
            { id: "tracker", label: "Sample Tracker" },
            { id: "documents", label: "Document Vault" },
            { id: "trends", label: "Analytical Trends" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 pt-1 relative whitespace-nowrap transition-colors
                ${activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground"}
              `}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="dashboard-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* DASHBOARD CONTENT */}
      <div className="container mx-auto px-4 py-8 flex-1">
        
        {activeTab === "overview" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="space-y-8"
          >
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Health Score</p>
                      <h3 className="text-4xl font-display font-bold text-foreground">
                        {complianceScore}<span className="text-xl text-muted-foreground">%</span>
                      </h3>
                    </div>
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 
                      ${complianceScore > 90 ? 'border-green-500 text-green-500' : 
                        complianceScore > 75 ? 'border-primary text-primary' : 
                        'border-yellow-500 text-yellow-500'}`}>
                      <Activity className="w-6 h-6" />
                    </div>
                  </div>
                  <Progress value={complianceScore} className="h-2 mt-4" />
                  <p className="text-xs text-muted-foreground mt-2">Based on current SFDA guidelines</p>
                </CardContent>
              </Card>
              
              <Card className="border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Active Samples</p>
                      <h3 className="text-4xl font-display font-bold text-foreground">12</h3>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                      <FlaskConical className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">8 Testing</Badge>
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">4 QA Review</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-sm bg-red-500/5 border-red-500/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-red-600 mb-1">Missing Tests</p>
                      <h3 className="text-4xl font-display font-bold text-red-700">2</h3>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-red-500/20 text-red-600 flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                  </div>
                  <Button size="sm" variant="destructive" className="w-full mt-4">
                    Address Gaps Now
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Gap Analysis */}
            <Card className="shadow-sm border-border">
              <CardHeader className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Gap Analysis</CardTitle>
                    <CardDescription>Required vs. Completed regulatory testing</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="hidden sm:flex"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
                </div>
              </CardHeader>
              <div className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-secondary/50 text-muted-foreground">
                      <tr>
                        <th className="px-6 py-4 font-medium">Test Parameter</th>
                        <th className="px-6 py-4 font-medium">Requirement</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Due Date</th>
                        <th className="px-6 py-4 font-medium text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {gapAnalysisData.map((row, i) => (
                        <tr key={i} className="hover:bg-muted/50 transition-colors">
                          <td className="px-6 py-4 font-medium">{row.test}</td>
                          <td className="px-6 py-4">
                            {row.required ? (
                              <Badge variant="outline">Required</Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-secondary text-muted-foreground">Optional</Badge>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {row.status === "Compliant" && <span className="inline-flex items-center gap-1.5 text-green-600"><CheckCircle2 className="w-4 h-4" /> Compliant</span>}
                            {row.status === "Missing" && <span className="inline-flex items-center gap-1.5 text-red-600"><AlertTriangle className="w-4 h-4" /> Missing</span>}
                            {row.status === "Optional" && <span className="text-muted-foreground">Not Started</span>}
                          </td>
                          <td className="px-6 py-4 text-muted-foreground">
                            {row.dueDate || "-"}
                          </td>
                          <td className="px-6 py-4 text-right">
                            {row.status === "Missing" ? (
                              <Button size="sm" className="h-8">Book</Button>
                            ) : (
                              <Button size="sm" variant="ghost" className="h-8">View</Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === "tracker" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold font-display mb-6">Live Order Tracker</h2>
            
            <Card>
              <CardHeader className="border-b bg-secondary/20 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Batch #TR-9942</CardTitle>
                    <CardDescription>Submitted: 14 Oct 2023 • Est. Completion: 18 Oct 2023</CardDescription>
                  </div>
                  <Badge className="bg-accent text-accent-foreground hover:bg-accent/90">Testing</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="relative">
                  {/* Vertical line for desktop, horizontal for mobile */}
                  <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-secondary md:left-0 md:top-[27px] md:w-full md:h-0.5" />
                  
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-4 relative z-10">
                    {[
                      { step: "Received", time: "14 Oct, 09:30", status: "done" },
                      { step: "Prep & extraction", time: "14 Oct, 14:15", status: "done" },
                      { step: "Instrumental Analysis", time: "In Progress", status: "current" },
                      { step: "QA Review & CoA", time: "Pending", status: "waiting" }
                    ].map((s, i) => (
                      <div key={i} className="flex md:flex-col gap-4 md:gap-2 items-start md:items-center text-left md:text-center">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 border-background shrink-0
                          ${s.status === "done" ? "bg-primary text-primary-foreground" : 
                            s.status === "current" ? "bg-accent text-accent-foreground ring-4 ring-accent/20 animate-pulse" : 
                            "bg-secondary text-muted-foreground"}
                        `}>
                          {s.status === "done" ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                        </div>
                        <div>
                          <h4 className={`font-bold ${s.status === "waiting" ? "text-muted-foreground" : "text-foreground"}`}>{s.step}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{s.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "documents" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold font-display">Document Vault</h2>
              <div className="flex gap-2">
                <Input placeholder="Search documents..." className="w-64 hidden sm:block" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map((i) => (
                <Card key={i} className="group hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-lg bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 flex items-center justify-center">
                        <FileText className="w-6 h-6" />
                      </div>
                      <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50">Verified</Badge>
                    </div>
                    <h3 className="font-bold text-lg mb-1">COA-2023-{8000+i}</h3>
                    <p className="text-sm text-muted-foreground mb-4">Product Batch Analysis</p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground pt-4 border-t">
                      <span>Oct {10+i}, 2023</span>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleDownload(`COA-2023-${8000+i}`)}>
                        <Download className="w-4 h-4 text-primary" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "trends" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-2xl font-bold font-display mb-6">Analytical Trends</h2>
            <Card>
              <CardHeader>
                <CardTitle>Historical Batch Consistency</CardTitle>
                <CardDescription>Tracking pH and Microbial limits over 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticalTrends} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis yAxisId="left" axisLine={false} tickLine={false} domain={[6.5, 8.0]} />
                      <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} />
                      <RechartsTooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Legend />
                      <Line 
                        yAxisId="left" 
                        type="monotone" 
                        dataKey="ph" 
                        name="pH Level" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3} 
                        dot={{ r: 6, strokeWidth: 2 }} 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="microbial" 
                        name="Microbial Count" 
                        stroke="hsl(var(--accent))" 
                        strokeWidth={3} 
                        dot={{ r: 6, strokeWidth: 2 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

      </div>
    </div>
  );
}
