'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Activity, TrendingUp, TrendingDown, Clock, User, Users, Plus, Apple, Watch, AlertTriangle, Download, LineChart } from 'lucide-react';

interface GlucoseEntry {
  id: number;
  glucose: number;
  timestamp: string;
  notes: string;
  meal: string;
  source: string;
}

interface Client {
  id: string;
  entries: GlucoseEntry[];
}

interface Alert {
  id: number;
  type: string;
  message: string;
  timestamp: string;
}

export default function GlucoseTracker() {
  const [view, setView] = useState<'client' | 'coach'>('client');
  const [clientId, setClientId] = useState('user123');
  const [entries, setEntries] = useState<GlucoseEntry[]>([]);
  const [newEntry, setNewEntry] = useState({
    glucose: '',
    timestamp: '',
    notes: '',
    meal: ''
  });
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [showChart, setShowChart] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const loadData = useCallback(() => {
    try {
      if (view === 'client') {
        const stored = localStorage.getItem(`glucose:${clientId}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          setEntries(parsed);
        } else {
          setEntries([]);
        }
      } else {
        const allKeys = Object.keys(localStorage).filter(key => key.startsWith('glucose:'));
        const clientData = allKeys.map(key => {
          try {
            const data = localStorage.getItem(key);
            return {
              id: key.replace('glucose:', ''),
              entries: data ? JSON.parse(data) : []
            };
          } catch (error) {
            return {
              id: key.replace('glucose:', ''),
              entries: []
            };
          }
        });
        setClients(clientData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }, [view, clientId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const checkForAlerts = useCallback(() => {
    const newAlerts: Alert[] = [];
    const recentEntries = entries.slice(0, 5);
    
    recentEntries.forEach(entry => {
      if (entry.glucose > 180) {
        newAlerts.push({
          id: entry.id,
          type: 'critical',
          message: `Critical high: ${entry.glucose} mg/dL`,
          timestamp: entry.timestamp
        });
      } else if (entry.glucose < 60) {
        newAlerts.push({
          id: entry.id,
          type: 'critical',
          message: `Critical low: ${entry.glucose} mg/dL`,
          timestamp: entry.timestamp
        });
      } else if (entry.glucose > 140) {
        newAlerts.push({
          id: entry.id,
          type: 'warning',
          message: `Elevated: ${entry.glucose} mg/dL`,
          timestamp: entry.timestamp
        });
      }
    });
    
    setAlerts(newAlerts);
  }, [entries]);

  useEffect(() => {
    if (entries.length > 0) {
      checkForAlerts();
    }
  }, [entries.length, checkForAlerts]);

  const saveEntry = () => {
    if (!newEntry.glucose || !newEntry.timestamp) return;

    const entry: GlucoseEntry = {
      id: Date.now(),
      glucose: parseFloat(newEntry.glucose),
      timestamp: newEntry.timestamp,
      notes: newEntry.notes,
      meal: newEntry.meal,
      source: 'manual'
    };

    const updatedEntries = [...entries, entry].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    try {
      localStorage.setItem(`glucose:${clientId}`, JSON.stringify(updatedEntries));
      setEntries(updatedEntries);
      setNewEntry({ glucose: '', timestamp: '', notes: '', meal: '' });
    } catch (error) {
      console.error('Error saving entry:', error);
      alert('Error saving entry. Please try again.');
    }
  };

  const syncWearable = () => {
    const mockWearableData: GlucoseEntry = {
      id: Date.now(),
      glucose: Math.floor(Math.random() * (140 - 70) + 70),
      timestamp: new Date().toISOString().slice(0, 16),
      notes: 'Auto-synced from Apple Watch',
      meal: '',
      source: 'apple_watch'
    };

    const updatedEntries = [...entries, mockWearableData].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    try {
      localStorage.setItem(`glucose:${clientId}`, JSON.stringify(updatedEntries));
      setEntries(updatedEntries);
      alert('Synced from Apple Watch!');
    } catch (error) {
      console.error('Error syncing wearable:', error);
    }
  };

  const exportData = () => {
    const dataToExport = view === 'client' ? entries : clients;
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `glucose-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getGlucoseStatus = (level: number) => {
    if (level < 60) return { status: 'Critical Low', color: 'text-red-600', bg: 'bg-red-50', dot: 'bg-red-500' };
    if (level < 70) return { status: 'Low', color: 'text-blue-600', bg: 'bg-blue-50', dot: 'bg-blue-500' };
    if (level > 180) return { status: 'Critical High', color: 'text-red-600', bg: 'bg-red-50', dot: 'bg-red-500' };
    if (level > 140) return { status: 'High', color: 'text-orange-600', bg: 'bg-orange-50', dot: 'bg-orange-500' };
    return { status: 'Normal', color: 'text-emerald-600', bg: 'bg-emerald-50', dot: 'bg-emerald-500' };
  };

  const calculateStats = (entriesData: GlucoseEntry[]) => {
    if (!entriesData.length) return { avg: '0', high: 0, low: 0, spikes: 0, trend: 'stable' };
    
    const values = entriesData.map(e => e.glucose);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const high = Math.max(...values);
    const low = Math.min(...values);
    const spikes = entriesData.filter(e => e.glucose > 140).length;
    
    const recent = entriesData.slice(0, 5).map(e => e.glucose);
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const trend = recentAvg > avg + 10 ? 'rising' : recentAvg < avg - 10 ? 'falling' : 'stable';

    return { avg: avg.toFixed(1), high, low, spikes, trend };
  };

  const SimpleChart = ({ data }: { data: GlucoseEntry[] }) => {
    const maxValue = Math.max(...data.map(d => d.glucose), 200);
    const minValue = Math.min(...data.map(d => d.glucose), 50);
    const range = maxValue - minValue;

    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-light mb-8 text-gray-800 tracking-wide">Glucose Trend</h3>
        <div className="relative h-72 flex items-end gap-3">
          {data.slice(0, 10).reverse().map((entry) => {
            const height = ((entry.glucose - minValue) / range) * 100;
            const status = getGlucoseStatus(entry.glucose);
            return (
              <div key={entry.id} className="flex-1 flex flex-col items-center group">
                <div className="text-xs font-medium mb-2 text-gray-700 group-hover:text-emerald-600 transition-colors">{entry.glucose}</div>
                <div 
                  className={`w-full ${status.dot} rounded-t transition-all hover:opacity-80 cursor-pointer`}
                  style={{ height: `${height}%` }}
                  title={`${entry.glucose} mg/dL - ${new Date(entry.timestamp).toLocaleString()}`}
                />
                <div className="text-xs text-gray-400 mt-3 transform -rotate-45 origin-top-left whitespace-nowrap">
                  {new Date(entry.timestamp).toLocaleDateString()}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-12 pt-6 border-t border-gray-100 text-sm text-gray-500">
          <span>Oldest</span>
          <span>Most Recent</span>
        </div>
      </div>
    );
  };

  const ClientView = () => {
    const stats = calculateStats(entries);

    return (
      <div className="space-y-8">
        <div className="text-center py-16">
          <h1 className="text-5xl font-light text-gray-800 mb-3 tracking-tight">transforming lives coaching</h1>
          <p className="text-emerald-600 font-light tracking-widest text-sm">be. nourish. vitalize.</p>
          <div className="mt-2 text-xs text-gray-400">Glucose Monitoring</div>
        </div>

        {alerts.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
            <div className="flex items-start gap-4">
              <AlertTriangle className="text-red-600 flex-shrink-0" size={24} />
              <div className="flex-1">
                <h3 className="font-medium text-red-800 mb-3">Recent Alerts</h3>
                {alerts.map(alert => (
                  <div key={alert.id} className="text-sm text-red-700 mb-2">
                    {alert.message} · {new Date(alert.timestamp).toLocaleString()}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Average</div>
            <div className="text-3xl font-light text-gray-800">{stats.avg}</div>
            <div className="text-xs text-gray-400 mt-1">mg/dL</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Spikes</div>
            <div className="text-3xl font-light text-orange-600">{stats.spikes}</div>
            <div className="text-xs text-gray-400 mt-1">&gt;140 mg/dL</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">High</div>
            <div className="text-3xl font-light text-gray-800">{stats.high}</div>
            <div className="text-xs text-gray-400 mt-1">mg/dL</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Low</div>
            <div className="text-3xl font-light text-gray-800">{stats.low}</div>
            <div className="text-xs text-gray-400 mt-1">mg/dL</div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setShowChart(!showChart)}
            className="flex-1 bg-gray-800 text-white p-4 rounded-xl font-light hover:bg-gray-700 transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <LineChart size={20} />
            {showChart ? 'Hide Chart' : 'Show Chart'}
          </button>
          <button
            onClick={exportData}
            className="bg-white border border-gray-300 text-gray-700 px-6 py-4 rounded-xl font-light hover:bg-gray-50 transition-all flex items-center gap-2 shadow-md"
          >
            <Download size={20} />
            Export
          </button>
        </div>

        {showChart && entries.length > 0 && <SimpleChart data={entries} />}

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-light mb-6 text-gray-800 tracking-wide">Add Reading</h3>
          
          <div className="space-y-5">
            <input
              type="number"
              placeholder="Glucose Level (mg/dL)"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-gray-800 font-light placeholder-gray-400 transition-all"
              value={newEntry.glucose}
              onChange={(e) => setNewEntry({...newEntry, glucose: e.target.value})}
            />
            
            <input
              type="datetime-local"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-gray-800 font-light transition-all"
              value={newEntry.timestamp}
              onChange={(e) => setNewEntry({...newEntry, timestamp: e.target.value})}
            />
            
            <select
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-gray-800 font-light transition-all"
              value={newEntry.meal}
              onChange={(e) => setNewEntry({...newEntry, meal: e.target.value})}
            >
              <option value="">When was this reading?</option>
              <option value="fasting">Fasting</option>
              <option value="before_meal">Before Meal</option>
              <option value="after_meal">After Meal (1-2 hrs)</option>
              <option value="bedtime">Bedtime</option>
            </select>
            
            <textarea
              placeholder="Notes (optional)"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-gray-800 font-light placeholder-gray-400 transition-all resize-none"
              value={newEntry.notes}
              onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
              rows={3}
            />
            
            <div className="flex gap-4 pt-2">
              <button
                onClick={saveEntry}
                className="flex-1 bg-emerald-600 text-white p-4 rounded-xl font-light hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Plus size={22} />
                Add Reading
              </button>
              
              <button
                onClick={syncWearable}
                className="bg-gray-800 text-white px-8 py-4 rounded-xl font-light hover:bg-gray-700 transition-all flex items-center gap-2 shadow-md"
              >
                <Apple size={22} />
                Sync
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <h3 className="text-xl font-light text-gray-800 tracking-wide">Recent Readings</h3>
          </div>
          
          <div className="divide-y divide-gray-100">
            {entries.map((entry) => {
              const status = getGlucoseStatus(entry.glucose);
              return (
                <div key={entry.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-4xl font-light text-gray-800">{entry.glucose}</span>
                        <span className="text-sm text-gray-400">mg/dL</span>
                        <span className={`px-4 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color} flex items-center gap-2`}>
                          <span className={`w-2 h-2 rounded-full ${status.dot}`}></span>
                          {status.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} />
                          {new Date(entry.timestamp).toLocaleString()}
                        </span>
                        {entry.source === 'apple_watch' && (
                          <span className="flex items-center gap-1.5 text-emerald-600">
                            <Watch size={14} />
                            Apple Watch
                          </span>
                        )}
                      </div>
                      
                      {entry.meal && (
                        <div className="text-sm text-gray-700 font-medium capitalize mb-2">{entry.meal.replace('_', ' ')}</div>
                      )}
                      
                      {entry.notes && (
                        <div className="text-sm text-gray-600 mt-3 p-4 bg-gray-50 rounded-lg border-l-2 border-emerald-500">{entry.notes}</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {entries.length === 0 && (
              <div className="p-16 text-center text-gray-400">
                <Activity size={48} className="mx-auto mb-4 opacity-30" />
                <p className="text-lg font-light">No readings yet. Add your first glucose reading above.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const CoachView = () => {
    return (
      <div className="space-y-8">
        <div className="text-center py-16 border-b border-gray-100">
          <h1 className="text-5xl font-light text-gray-800 mb-3 tracking-tight">Coach Dashboard</h1>
          <p className="text-emerald-600 font-light tracking-widest text-sm">Monitor Client Health</p>
          <button
            onClick={exportData}
            className="mt-6 bg-gray-800 text-white px-8 py-3 rounded-xl font-light hover:bg-gray-700 transition-all flex items-center gap-2 shadow-md mx-auto"
          >
            <Download size={20} />
            Export All Data
          </button>
        </div>

        <div className="grid gap-8">
          {clients.map((client) => {
            const stats = calculateStats(client.entries);
            const recentSpikes = client.entries.filter(e => 
              e.glucose > 140 && 
              new Date(e.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            ).length;
            const criticalReadings = client.entries.filter(e => e.glucose > 180 || e.glucose < 60).length;

            return (
              <div key={client.id} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-light text-gray-800 flex items-center gap-3 mb-2">
                      <User size={24} className="text-emerald-600" />
                      Client {client.id}
                      {criticalReadings > 0 && (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">
                          <AlertTriangle size={14} />
                          {criticalReadings} Critical
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500">{client.entries.length} total readings</p>
                  </div>
                  <button
                    onClick={() => setSelectedClient(selectedClient === client.id ? null : client.id)}
                    className="px-6 py-2 bg-gray-800 text-white rounded-xl text-sm font-light hover:bg-gray-700 transition-all shadow-md"
                  >
                    {selectedClient === client.id ? 'Hide Details' : 'View Details'}
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Avg</div>
                    <div className="text-2xl font-light text-gray-800">{stats.avg}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Low</div>
                    <div className="text-2xl font-light text-gray-800">{stats.low}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">High</div>
                    <div className="text-2xl font-light text-gray-800">{stats.high}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Spikes</div>
                    <div className="text-2xl font-light text-orange-600">{recentSpikes}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Trend</div>
                    <div className="text-2xl font-light text-emerald-600 capitalize">{stats.trend}</div>
                  </div>
                </div>

                {selectedClient === client.id && (
                  <div className="border-t border-gray-100 pt-6 mt-6 space-y-6">
                    {client.entries.length > 0 && <SimpleChart data={client.entries} />}
                    
                    <div>
                      <h4 className="font-light text-gray-800 mb-4 text-lg">Recent Readings</h4>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {client.entries.slice(0, 10).map((entry) => {
                          const status = getGlucoseStatus(entry.glucose);
                          return (
                            <div key={entry.id} className="flex items-center justify-between p-5 bg-gray-50 rounded-xl border border-gray-100 hover:border-emerald-200 transition-all">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="text-2xl font-light text-gray-800">{entry.glucose}</span>
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color} flex items-center gap-2`}>
                                    <span className={`w-2 h-2 rounded-full ${status.dot}`}></span>
                                    {status.status}
                                  </span>
                                </div>
                                <div className="text-xs text-gray-500">
                                  {new Date(entry.timestamp).toLocaleString()}
                                  {entry.meal && <span className="text-emerald-600"> · {entry.meal.replace('_', ' ')}</span>}
                                </div>
                                {entry.notes && <div className="text-sm text-gray-600 mt-2 p-3 bg-white rounded border-l-2 border-emerald-500">{entry.notes}</div>}
                              </div>
                              {entry.glucose > 140 && <TrendingUp className="text-orange-500 ml-4" size={24} />}
                              {entry.glucose < 70 && <TrendingDown className="text-blue-500 ml-4" size={24} />}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {clients.length === 0 && (
            <div className="bg-white p-20 rounded-2xl border border-gray-100 text-center shadow-lg">
              <Users size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg font-light">No clients with glucose data yet</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex gap-4 mb-12">
          <button
            onClick={() => setView('client')}
            className={`flex-1 py-4 px-6 rounded-xl font-light transition-all flex items-center justify-center gap-2 text-base shadow-md ${
              view === 'client' 
                ? 'bg-emerald-600 text-white' 
                : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300'
            }`}
          >
            <User size={20} />
            Client View
          </button>
          <button
            onClick={() => setView('coach')}
            className={`flex-1 py-4 px-6 rounded-xl font-light transition-all flex items-center justify-center gap-2 text-base shadow-md ${
              view === 'coach' 
                ? 'bg-emerald-600 text-white' 
                : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300'
            }`}
          >
            <Users size={20} />
            Coach Dashboard
          </button>
        </div>

        {view === 'client' ? <ClientView /> : <CoachView />}
      </div>
    </div>
  );
}