---
published: true
---
## Advanced Topics in Computer Systems (262a-f18)

Aug 30 2018 

FSCQ 
logical block mapping to choose where to put on platter, archival data inside the platter and fast access data on the outside
never use RAID 5 again lmao
4ms to track switch, but much less to read next thing on the block
3 modes for a Journaling File System - Writeback, Ordered, Data journaling. (write metadata+journal independently and journal only metadata, ordering, or both first to journal)

journals can be stored in different portions of a disk. Ext2/3 


## Comp + Theoretical Immunology  (294-E?)


"immune repertoire diversity: inference and modeling"

paper1: http://www.pnas.org/content/107/12/5405
paper2: http://www.pnas.org/content/113/2/274

"Typical" zebrafish B cell CDR3 Repertoires
28-112k sequences/fish /w primer dep amplification bias
D region in zebra fish antibodies - 1-6 antiacids
restricted to D region which act like clone barcodes
Can we say anything about P(\sigma) from the data?

Max Entropy Model
MaxEnt model = "least structured model consistent with observables"

Restrict to individual and pairwise data so that num of vars ~ 10^3.


Takeaways (2nd paper)

- Clone speciifc vs cell specific fluctuating fitness give different qualitative results in this framework of lymphocyte diversity.
- may be able to estimate key growth params from clean enough data (fitting power law exp and crossovers)


---


Self notes:

via Wikipedia:
- T cell: "a lymphocyte of a type produced or processed by the thymus gland and actively participating in the immune response"
- ligand: "an ion or molecule attached to a metal atom by coordinate bonding."
- kinetic proofreading: " Kinetic proofreading allows enzymes to discriminate between two possible reaction pathways leading to correct or incorrect products with an accuracy higher than what one would predict based on the difference in the activation energy between these two pathways"


## Modeling T Cell Ligand Discrimination (Slides)
Jonathan Liu

1. T Cell Signaling

T cell activation is fast sensititive and digital
How can we explain this theoretically?
 
Certain activation < 15sec. Digital - trigger or dont. Question: how do you explain these props theoretically? What kind of network?

2. Two models of activation

- Conformational change
	- Based on structural interactions
	- Data doesn't support this

- Kinetic Proofreading
	- Based on lifetime of PMHC-TCR complex
	- Shown to correlate w T-Cell activation

3. Kinetic Proofreading

- if you consider a system in thermo eq - fund limit on how 

4. Experimental Setup

Input specified # of pMHC ligands (concentration not types)
Measure output using immunostaining / flow cytometry

Jargon:
- Output: ppERK (phosphorylation of extxracellular regulated kinase)
- Input = pMHC ligand per APC
	- SIINFEKL-K^b, EIINFEKL-K^b, SIIRFEKL-K^b

Paper: Altan Bonnet and Germain 2005 Modeling T Cell Antigen Discimination Based on Feedback Control of Digital ERK Resopnses

5. Indiv cell response

Varied input molecules (Graph A)
Bimodal # of cells /w high and low ppERK output (Graph B)

6. Pop Response
7. Differing Ligand strength
8. Problems w Kinetic Proofreading

- Tradeoff bw selectivity and speed
- Data suggest additional network complexity
- We need fast response time, Buffering against weak binders, Huge amplification of strong binders.

Solution: Pos/Neg Feedback

9. Sample structural change chart generated from some caltech group software
10. Response time depends on concentration of agonist ligand (agonist: something that bind to something)
11. Hierarchical antagonism in signaling
- mixing non+agonist ligands is slower
- EIIINFEKL is more antagonist

varying concentration of specific binder vs nonspecific binders

12. Varying discrimination based on T cell differentiation
Amount of SHP1 (negative feedback) vs (non-)agonist.

13. Conceptual
- Change amount of neg feedback
- Change amount of nonspecific binder
- Change amount of agonist

14. Summary
- T cell activation incorporates kinetic proofreading w simultaneous positive and negative feedback loops
- Allows for high speed sensitivity and discrimination
- Simulated results qualitatively agree w data

15. Discussion Points
- Can we write a simpler phenomenological model that captures the qualitative behavior?
- What elements are relevant? How can we generalize?
- Do we need to consider stochasticity?
- Can we approach this from a more biophysical perspective? e.g. stat mech of binding
- Can we experimentally acess specific points in network?


## Comp + Theoretical Immunology 

## mathematical modeling of affinity maturation
Feb 15 2015

introduction to AF
2 the Kepler Perelson Model (1993)
Opera Perelson (1997)
Meyan Moremann (2012)

I 
Def  AF is the process by which B cells produce antibodies with increased affinity for antigen during immune response.

It involves 2 processes (Jeff.)
- Somatic hypermutation
- Clonal Selection (select the right something)

Cell Bio

B Cell -> centroblot -> centrocyte (DZ) -> (some not selected, LZ) b cell with increased infinity

Germinal Center - distinguish two zones: Dark/Light zone.

This started during immune response - very dynamic. 
The GC has a dynamic morphology 
You start with a initial reaction triggered by immune response:
D0 (reaction) ->      D4 (DZ/LZ formed) -> (development) D14 -> dissolves (D21).
There is a specific antigen associated with germinal center

Dark/Light zone - in the old days, dark: lots of b cells doing something protein so it looked dark in imaging?

Questions from this paper: 

1. How to explain high efficiency of affinity maturation?  (How to achieve a population of BCells w high affinity?)
2. How to explain the special organization of the germinal center?

Mathematical Reformulation of 1: How to maximize at the end of the GC reaction chain the global affinity of b cells?
	-> how to define affinity? coarse grain what is affinity -> define different levels of affinity (K-2,k1,k0,...K2)
	-> A = \sum b_i K_i  (# of b cells in slab i)

Idea: Model the pop dynamics of b cells by a system of ODEs dep on the mutation schedule \mu(t), and find \mu that maximze A(T), and T=14 days chosen.

(i) -> (i) + (i) (grow)
	-> (\emptyset) (die)
	-> (j) (mutate)

---
													v (death event, proliferation event)       v (mutation event, has M_{ij} that accounts for 
mutation rate)
dB/dT = F(B, \mu(t)). dB_i/dT = b_i 1_B(t) >=1 (t)   (...) + \sum_(j != i) n_j 1_{B_j(t)} (t) (...)
approximating a discrete difference eq /w a differential eq.

M_{ij} = [L_\mu (1-p_s)(1-p_l)] ^|i-j| e^{-L\mu (1-\mu s)} / |i-j|! (1+r^{j-i})

There are tools that allow to answer the questions with K-P model --

Optimal control theory

\dot{x} S(t,x,u) u = "command". Imagine you have a physical system, e.g. thermostat that you can change.
x(t_0) = x_0
J(u) = K(t_p,x_p) + \integrate_{t_0,t_f} L(t, x(t), u(t)) dt
Ponteyugims maximum principle (1962) you can maximze ^ quantity - which is basically the global affinity. Under the assumptions \exists v* | \forall u \in V,  a) <= J(u*) or something. Can write a hamiltonian to optimize u*?

Consider book Review: Immunology for physicists.

Results: Stay between days in these different mutation/non mutation period - looks like shark fins |\__|\___|\__. the period of the fin is days they think.

Conclusion: Alteration between periods of rapid mutation and of mutation free growth
Interpretation: in the optimal slution the pop first grows quickly as possible uin the something of mutation until the one N = 1/P_A cells prob 

2. "Such an optimal schedule can arise naturally from the structure of the GC". The temporal variation of the \mu*(t) would be implemented by spatial compartimentalization 

C1					 | C2
(delection/mutation) |  Proliferation 
					 <- can go back supposedly.


II ) Paper 2
"strategy is difficult to reconcile with temporarl and spatial plethora of cell movement and expansion with the germinal center"

Found the actual sitting in the dark zone before light zone is hours not days like they thought.

				DZ						  | LZ 
Start B(t) bcell -> Centroblast(B_i (t))  |  -> Centrocyte (C_i(t) ) ->  R_i(t) -> F_i(t) folliculardendritic cells (antigens), these antigens can just bind. once get antigen you can live and go out as plasma or you can recycle.  competition is in the LZ, can bind with a lower affinity

T Follicular helper cells (TFH) ^ discovered in 2005,  
Stromal cells in DZ 

want to measure:
1) GC Size: 

Affinity? 
- The is an optimal Pr for total affinity but not the average affinity? 
- What about plasma 

III) 
chromotaxis
CXCL 12        CXCL13
^ centroblasts   ^ TFH 
^ centroblast
